from django.urls import path

from voucher.views import UseVoucherView

urlpatterns = [
    path('voucher/use/<int:pk>', UseVoucherView.as_view()),

]
