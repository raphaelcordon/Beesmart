from django.urls import path

from voucher.views import UseVoucherView, EndUsersActiveVouchers, EndUsersUsedVouchers

urlpatterns = [
    path('voucher/use/<int:voucher_id>/', UseVoucherView.as_view(), name='Use voucher'),
    path('voucher/enduser/active/', EndUsersActiveVouchers.as_view(),
         name='Get end users active vouchers'),
    path('voucher/enduser/used/', EndUsersUsedVouchers.as_view(),
         name='Get end users used vouchers'),

]
