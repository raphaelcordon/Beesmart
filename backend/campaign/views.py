from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from campaign.models import Campaign
from campaign.serializers import CampaignSerializer
from customer_user_profile.models import CustomerUserProfile
from project.permissions import IsCampaignOwner


class ListCreateApiCampaignView(ListCreateAPIView):
    """
    API view to list and create campaigns for a customer user profile.
    """
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]  # Ensures that only authenticated users can access this view

    def get_queryset(self):
        """
        Return campaigns specifically for the logged-in user's customer profile.
        """
        # Efficient retrieval of the customer's profile with a one-time database query
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        return Campaign.objects.filter(customer_user_profile=customer_user_profile).order_by('date_created')

    def perform_create(self, serializer):
        """
        Automatically assigns the logged-in user's customer profile to the new campaign.
        """
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        serializer.save(customer_user_profile=customer_user_profile)


class ReadUpdateDeleteCampaignView(RetrieveUpdateDestroyAPIView):
    """
    API view to read, update, and delete a single campaign, ensuring that the user is authenticated and is the owner of the campaign.
    """
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated, IsCampaignOwner]


class ListEndUsersCampaignsView(ListAPIView):
    """
    API view to list all campaigns associated with a given end user identified by a secret key.
    """
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.all()
    permission_classes = [IsAuthenticated]  # no permissions, letting end users access endpoint with secret keys

    def get_queryset(self):
        """
        Filters campaigns based on the secret key of the end user profile linked to the campaigns through collectors.
        """
        secret_key = self.kwargs['secret_key']
        return Campaign.objects.filter(collectors__end_user_profile__secret_key=secret_key).distinct()
