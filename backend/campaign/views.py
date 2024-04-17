from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from campaign.models import Campaign
from campaign.serializers import CampaignSerializer, CampaignStyleSerializer
from customer_user_profile.models import CustomerUserProfile
from end_user_profile.models import EndUserProfile
from project.permissions import IsCampaignOwner


class ListCreateApiCampaignView(ListCreateAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        return Campaign.objects.filter(customer_user_profile=customer_user_profile).order_by('date_created')

    def perform_create(self, serializer):
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        serializer.save(customer_user_profile=customer_user_profile)


class ListCreateApiCampaignView(ListCreateAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        return Campaign.objects.filter(customer_user_profile=customer_user_profile).order_by('date_created')

    def perform_create(self, serializer):
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        serializer.save(customer_user_profile=customer_user_profile)


class ReadUpdateDeleteCampaignView(RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = (IsAuthenticated, IsCampaignOwner)


class ListEndUsersCampaignsView(ListAPIView):
    serializer_class = CampaignSerializer
    permission_classes = []
    queryset = Campaign.objects.all()

    def get_queryset(self):
        return Campaign.objects.filter(collectors__end_user_profile__secret_key=self.kwargs['secret_key']).distinct()
