from django.urls import path

from campaign.views import ListCreateApiCampaignView, ReadUpdateDeleteCampaignView

urlpatterns = [
    path('campaign/', ListCreateApiCampaignView.as_view(), name='create, get logged in business campaigns'),
    path('campaign/<int:pk>', ReadUpdateDeleteCampaignView.as_view(), name='update, delete logged in business campaigns'),
    path('campaign/endUser/<str:pk>', ListCreateApiCampaignView.as_view(), name='Get all End Users campaigns'),

]
