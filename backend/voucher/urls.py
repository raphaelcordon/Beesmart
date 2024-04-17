from django.urls import path

from voucher.views import UseVoucherView, EndUsersSpecificCampaignVouchers

urlpatterns = [
    path('voucher/use/<int:pk>', UseVoucherView.as_view(), name='Use voucher'),
    path('voucher/enduser/<int:pk>', EndUsersSpecificCampaignVouchers.as_view(), name='Get end users specific campaign vouchers'),

]
