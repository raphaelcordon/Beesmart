from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from campaign.models import Campaign, CampaignStyle
from campaign.serializers import CampaignSerializer, CampaignStyleSerializer
from project.permissions import IsOwner


class ListCreateApiCampaignView(ListCreateAPIView):
    queryset = Campaign.objects.all().order_by('date_created')
    serializer_class = CampaignSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ReadUpdateDeleteCampaignView(RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = (IsAuthenticated, IsOwner)


class ListCreateApiCampaignStyleView(ListCreateAPIView):
    queryset = CampaignStyle.objects.all()
    serializer_class = CampaignStyleSerializer


class ReadUpdateDeleteCampaignStyleView(RetrieveUpdateDestroyAPIView):
    queryset = CampaignStyle.objects.all()
    serializer_class = CampaignStyleSerializer
