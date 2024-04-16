import random

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.response import Response

from customer_user_profile.models import CustomerUserProfile
from end_user_profile.models import EndUserProfile
from user.serializers import CustomerUserSerializer, UserRegistrationSerializer, EndUserSerializer

User = get_user_model()


def code_generator(length=15):
    numbers = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    return ''.join(random.choice(numbers) for _ in range(length))


class MeCustomerUser(CreateAPIView):
    serializer_class = CustomerUserSerializer

    def post(self, request, *args, **kwargs):
        user = self.request.user
        me = User.objects.get(id=user.id)
        serializer = CustomerUserSerializer(me)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MeEndUser(CreateAPIView):
    serializer_class = CustomerUserSerializer

    def post(self, request, *args, **kwargs):
        user = self.request.user
        me = User.objects.get(id=user.id)
        serializer = CustomerUserSerializer(me)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Create your views here.
class CreateCustomerUser(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        if email:
            if User.objects.filter(email=email).exists():
                return Response('Customer user already exists', status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User.objects.create(email=email, username=email, is_customer=True)
                code = user.customer_user_profile.code
                send_mail(
                    'Registration code:',
                    f'generated code: {code}',
                    'mot83161@gmail.com',
                    [email],
                    fail_silently=False,
                )
                return Response("Code was generated and sent to your email", status=status.HTTP_200_OK)
        else:
            return Response("No email provided", status=status.HTTP_400_BAD_REQUEST)


class VeryfiCustomerUserView(UpdateAPIView):
    serializer_class = CustomerUserSerializer
    permission_classes = []

    def patch(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = request.data.get('email')
        business_name = request.data.get('business_name')
        country = request.data.get('country')
        city = request.data.get('city')
        street = request.data.get('street')
        zip = request.data.get('zip')
        password = request.data.get('password')
        re_password = request.data.get('password_repeat')

        if password != re_password:
            return Response('Password does not match', status=status.HTTP_400_BAD_REQUEST)

        if not all([code, email, business_name, country, city, street, zip, password]):
            return Response('Missing required fields', status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            user_profile = CustomerUserProfile.objects.get(user=user)

            if user.customer_user_profile.code == code:
                user.set_password(password)
                user.save()
                user_profile.business_name = business_name
                user_profile.country = country
                user_profile.city = city
                user_profile.street = street
                user_profile.zip = zip
                user_profile.save()
                return Response("User successfully verified", status=status.HTTP_200_OK)

            return Response('Invalid verification code', status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response('This User does not exist.', status=status.HTTP_400_BAD_REQUEST)


class CreateEndUser(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')

        if email:
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
            send_mail(
                'Registration code:',
                f'http://localhost:8000/backend/api/users/user/veryfi/{code}',
                'mot83161@gmail.com',
                [email],
                html_message=f'<h1>WELCOME http://localhost:8000/backend/api/users/user/veryfi/{code}</h1>',
                fail_silently=False,
            )
            return Response("Link was sent to your email", status=status.HTTP_200_OK)
        else:
            return Response("No email provided", status=status.HTTP_400_BAD_REQUEST)


class GenerateEndUserCard(ListAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = []

    def get_queryset(self):
        return EndUserProfile.objects.get(code=self.kwargs['pk'])

    def get(self, request, *args, **kwargs):
        try:
            profile = EndUserProfile.objects.get(code=self.kwargs['pk'])
            user = User.objects.get(end_user_profile=profile)
            profile.code = code_generator()
            profile.save()
            serializer = EndUserSerializer(user)
            send_mail(
                'Registration code:',
                f'{serializer.data}',
                'mot83161@gmail.com',
                [user.email],
                fail_silently=False,
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
            # add card functionality
        except Exception as e:
            return Response('Link is outdated', status=status.HTTP_400_BAD_REQUEST)
