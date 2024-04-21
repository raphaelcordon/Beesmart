import random

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http import Http404
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from customer_user_profile.models import CustomerUserProfile
from email_layouts.get_card_email import get_card_layout
from email_layouts.qr_email import email_layout

from end_user_profile.models import EndUserProfile
from project.permissions import IsSelf
from project.settings import MEDIA_HOST, FRONT_END_HOST
from user.serializers import CustomerUserSerializer, UserRegistrationSerializer, EndUserSerializer, \
    CustomerUserUpdateDeleteSerializer

User = get_user_model()


def code_generator(length=15):
    numbers = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    return ''.join(random.choice(numbers) for _ in range(length))


class MeCustomerUser(RetrieveAPIView):
    """
    API view to retrieve the authenticated customer user's details.
    """
    serializer_class = CustomerUserSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieves the authenticated user's details and returns them.
        Uses a GET method to conform with the typical RESTful approach for data retrieval.
        """
        # Directly use the authenticated user from the request without additional database query
        serializer = CustomerUserSerializer(self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MeEndUser(RetrieveAPIView):
    """
    API view to retrieve the authenticated end user's details.
    """
    serializer_class = EndUserSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieves the authenticated user's details and returns them.
        Uses a GET method to conform with the typical RESTful approach for data retrieval.
        """
        # Directly use the authenticated user from the request without additional database query
        serializer = CustomerUserSerializer(self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Create your views here.
class CreateCustomerUser(CreateAPIView):
    """
    API view to handle creation of customer user accounts.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # letting all users access this endpoint

    def create(self, request, *args, **kwargs):
        """
        Overridden create method to add custom logic for user creation and sending an email with a registration code.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate serializer data and raise an exception on failure.

        email = serializer.validated_data.get('email')

        if not email:
            return Response("No email provided", status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response('Customer user already exists', status=status.HTTP_400_BAD_REQUEST)

        # Create the user with the validated email. Assuming `is_customer` is a field on the User model.
        user = User.objects.create(email=email, username=email, is_customer=True)

        # Assuming `customer_user_profile` is created via signals or overridden save method on the User model.
        code = user.customer_user_profile.code

        send_mail(
            'Registration code:',
            f'generated code: {code}',
            'mot83161@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response("Code was generated and sent to your email", status=status.HTTP_200_OK)


class VeryfiCustomerUserView(UpdateAPIView):
    """
    API view to verify customer users using a code and update their user profile.
    """
    serializer_class = CustomerUserSerializer
    permission_classes = []  # letting all users access this endpoint

    def patch(self, request, *args, **kwargs):
        # Extract data from the request
        code = request.data.get('code')
        email = request.data.get('email')
        business_name = request.data.get('business_name')
        country = request.data.get('country')
        city = request.data.get('city')
        street = request.data.get('street')
        zip = request.data.get('zip')
        password = request.data.get('password')
        re_password = request.data.get('password_repeat')

        # Check if the provided passwords match, if not, return an error
        if password != re_password:
            return Response('Password does not match', status=status.HTTP_400_BAD_REQUEST)

        # Ensure all required fields are provided
        if not all([code, email, business_name, country, city, street, zip, password]):
            return Response('Missing required fields', status=status.HTTP_400_BAD_REQUEST)

        # Attempt to retrieve the user by email and verify the provided code
        try:
            user = User.objects.get(email=email)
            user_profile = CustomerUserProfile.objects.get(user=user)

            # Check if the code on the user profile matches the provided code
            if user.customer_user_profile.code == code:
                # Set the new password and save the user object
                user.set_password(password)
                user.save()

                # Update other user profile details and save
                user_profile.business_name = business_name
                user_profile.country = country
                user_profile.city = city
                user_profile.street = street
                user_profile.zip = zip
                user_profile.save()

                # Return a success response if everything is updated correctly
                return Response("User successfully verified", status=status.HTTP_200_OK)

            # Return an error if the verification code does not match
            return Response('Invalid verification code', status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            # Return an error if no user is found with the provided email
            return Response('This User does not exist.', status=status.HTTP_400_BAD_REQUEST)


class CreateEndUser(CreateAPIView):
    """
    API view to handle end-user registration. This view creates a new user or updates
    existing user's codes and sends a verification link via email.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # letting all users access this endpoint

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validates incoming data and raises an exception on failure.

        email = serializer.validated_data.get('email')
        if not email:
            return Response("No email provided", status=status.HTTP_400_BAD_REQUEST)

        # Ensure the user profile is created, and generate new codes if the user was already in the system.
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            user_profile = EndUserProfile.objects.get(user=user)
            user_profile.code = code_generator()
            user_profile.secret_key = code_generator()
            user_profile.save()
            code = user_profile.code
        else:
            user = User.objects.create(email=email, username=email)
            code = user.end_user_profile.code

        # Prepare and send the email.
        send_mail(
            'Registration code:',
            f'{MEDIA_HOST}/backend/api/enduser/user/verify/{code}',
            'mot83161@gmail.com',
            [email],
            # html_message=f'<h1>WELCOME {MEDIA_HOST}/backend/api/enduser/user/verify/{code}</h1>',
            html_message=get_card_layout(FRONT_END_HOST, code, MEDIA_HOST),
            fail_silently=False,
        )
        return Response("Link was sent to your email", status=status.HTTP_200_OK)


class GenerateEndUserCard(RetrieveAPIView):
    """
    API view to generate a new QR code for an end user and send it via email.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # letting all users access this endpoint

    def get_object(self):
        """
        Retrieve and return the EndUserProfile based on the provided 'code' in the URL.
        Overriding this method to include specific error handling and logic for code regeneration.
        """
        try:
            profile = EndUserProfile.objects.get(code=self.kwargs['generated_code'])
            profile.code = code_generator()  # Update the code on access
            profile.save(update_fields=['code'])
            return profile
        except EndUserProfile.DoesNotExist:
            # Handle case where profile does not exist to send a specific error response.
            raise NotFound('Profile with the given code does not exist.')

    def retrieve(self, request, *args, **kwargs):
        """
        Overridden retrieve method to send an email with the QR code after successful retrieval
        and regeneration of the user's code.
        """
        profile = self.get_object()  # Get the object using the overridden get_object method.
        user = profile.user  # Access user directly from profile assuming a reverse relation from User to EndUserProfile.
        secret_key = profile.secret_key

        # Attempt to send an email with the QR code
        try:
            send_mail(
                'Registration code:',
                'Here is your updated QR code.',
                'from@example.com',  # Replace with your actual email or Django setting for default email.
                [user.email],
                html_message=email_layout(profile.qr_code.url, MEDIA_HOST, FRONT_END_HOST, secret_key),
                fail_silently=False,
            )
            serializer = EndUserSerializer(profile.user)  # Serialize user data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)  # Consider logging this instead of printing for production.
            return Response('Failed to send QR code. Please try again.', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteCustomerUser(DestroyAPIView):
    """
    API view to delete a CustomerUserProfile associated with the current authenticated user.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsAuthenticated, IsSelf]
    queryset = CustomerUserProfile

    def get_object(self):
        # This method ensures that you retrieve the user's profile correctly.
        try:
            return User.objects.get(id=self.request.user.id)
        except User.DoesNotExist:
            raise Http404


class UpdateCustomerUser(UpdateAPIView):
    """
    API view to update a CustomerUserProfile for the currently authenticated user.
    """
    serializer_class = CustomerUserUpdateDeleteSerializer
    permission_classes = [IsAuthenticated, IsSelf]
    queryset = CustomerUserProfile.objects.all()

    def get_object(self):
        """
        Retrieve the CustomerUserProfile associated with the current authenticated user.
        This override ensures that we directly fetch the user's profile, raising Http404 if not found.
        """
        try:
            return CustomerUserProfile.objects.get(user=self.request.user)
        except CustomerUserProfile.DoesNotExist:
            raise Http404

    def patch(self, request, *args, **kwargs):
        """
        Handle the PATCH request to partially update the user's profile.
        """
        profile = self.get_object()  # Retrieve the user profile.
        serializer = self.serializer_class(profile, data=request.data, partial=True)  # Allow partial updates

        if serializer.is_valid():
            serializer.save()  # This automatically updates the profile instance
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Return errors if validation fails.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
