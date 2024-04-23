from django.urls import path

from collector.views import CollectorValidateView, EndUsersSpecificCampaignCollectors, CustomerAndSpecificUserCollectors

urlpatterns = [
    path('collector/validate/', CollectorValidateView.as_view(), name='checks in collector (add points)'),
    path('collector/enduser/<int:campaign_id>', EndUsersSpecificCampaignCollectors.as_view(),
         name='end user gets his collectors'),
    path('collector/customer/', CustomerAndSpecificUserCollectors.as_view(),
         name='customer and specific users collectors'),

]
