from django.urls import path

from collector.views import CollectorValidateView, EndUsersSpecificCampaignCollectors

urlpatterns = [
    path('collector/validate/', CollectorValidateView.as_view(), name='checks in collector (add pints)'),
    path('collector/enduser/<int:campaign_id>', EndUsersSpecificCampaignCollectors.as_view(), ),

]
