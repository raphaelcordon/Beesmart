from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from campaign.models import Campaign
from campaign.serializers import CampaignSerializer, CampaignStyleSerializer
from customer_user_profile.models import CustomerUserProfile
from end_user_profile.models import EndUserProfile
from project.permissions import IsCampaignOwner


class ListCreateApiCampaignView(ListCreateAPIView):
    queryset = Campaign.objects.all().order_by('date_created')
    serializer_class = CampaignSerializer

    def perform_create(self, serializer):
        customer_user_profile = CustomerUserProfile.objects.get(user=self.request.user)
        serializer.save(customer_user_profile=customer_user_profile)


class ReadUpdateDeleteCampaignView(RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = (IsAuthenticated, IsCampaignOwner)


class ListEndUsersCampaignsView(ListAPIView):
    serializer_class = CampaignStyleSerializer
    permission_classes = []

    def get_queryset(self):
        end_user_profile = EndUserProfile.objects.get(secret_key=self.request.query_params.get('pk'))
        return Campaign.objects.filter(end_user_profile=end_user_profile)

# class ListCreateApiCampaignStyleView(ListCreateAPIView):
#     queryset = CampaignStyle.objects.all()
#     serializer_class = CampaignStyleSerializer
#
#
# class ReadUpdateDeleteCampaignStyleView(RetrieveUpdateDestroyAPIView):
#     queryset = CampaignStyle.objects.all()
#     serializer_class = CampaignStyleSerializer
