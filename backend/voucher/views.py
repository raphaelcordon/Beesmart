# from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import UpdateAPIView, CreateAPIView
from rest_framework.response import Response

from voucher.models import Voucher
from voucher.serializers import UseVoucherSerializer


# Create your views here.
class UseVoucherView(UpdateAPIView):
    serializer_class = UseVoucherSerializer
    # permission_classes = [IsCampaignAuthor]
    queryset = Voucher.objects.all()

    def patch(self, request, *args, **kwargs):
        if Voucher.objects.get(id=kwargs['pk']).exists():
            voucher = Voucher.objects.get(id=kwargs['pk'])
            if voucher.is_used:
                return Response('Voucher already used', status=status.HTTP_400_BAD_REQUEST)

            voucher.is_used = True
            return Response('You just used your Voucher', status=status.HTTP_200_OK)
        return Response('Voucher does not exist', status=status.HTTP_404_NOT_FOUND)


class EndUsersSpecificCampaignVouchers(CreateAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()

    def post(self, request, *args, **kwargs):
        secret_key = request.data['secret_key']
        if Voucher.objects.filter(campaign__id=kwargs['pk'], end_user_profile__secret_key=secret_key).exists():
            vouchers = Voucher.objects.filter(campaign__id=kwargs['pk'], end_user_profile__secret_key=secret_key)
            serializer = UseVoucherSerializer(vouchers)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('Voucher does not exist', status=status.HTTP_404_NOT_FOUND)
