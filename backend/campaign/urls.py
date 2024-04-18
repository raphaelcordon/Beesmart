from django.urls import path

from campaign.views import ListCreateApiCampaignView, ReadUpdateDeleteCampaignView, ListEndUsersCampaignsView

urlpatterns = [
    path('campaign/', ListCreateApiCampaignView.as_view(), name='create, get logged in business campaigns'),
    path('campaign/closed/', ListCreateApiCampaignView.as_view(), name='get logged in business closed campaigns'),
    path('campaign/<int:pk>', ReadUpdateDeleteCampaignView.as_view(), name='update, delete logged in business campaigns'),
    path('campaign/endUser/<str:secret_key>', ListEndUsersCampaignsView.as_view(), name='Get all End Users campaigns'),

]
