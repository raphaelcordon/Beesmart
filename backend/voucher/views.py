# from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from voucher.models import Voucher
from voucher.serializers import UseVoucherSerializer


# Create your views here.
class UseVoucherView(UpdateAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        if Voucher.objects.filter(id=kwargs['voucher_id']).exists():
            if self.request.user.customer_user_profile != Voucher.objects.get(
                    id=kwargs['voucher_id']).campaign.customer_user_profile:
                return Response('You have no permission to use this voucher', status=status.HTTP_404_NOT_FOUND)
            voucher = Voucher.objects.get(id=kwargs['voucher_id'])
            if voucher.is_used:
                return Response('Voucher already used', status=status.HTTP_400_BAD_REQUEST)

            voucher.is_used = True
            voucher.save()
            return Response('You just used your Voucher', status=status.HTTP_200_OK)
        return Response('Voucher does not exist', status=status.HTTP_404_NOT_FOUND)


class EndUsersSpecificCampaignVouchers(CreateAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        secret_key = request.data['secret_key']
        if Voucher.objects.filter(campaign__id=kwargs['campaign_id'], end_user_profile__secret_key=secret_key).exists():
            vouchers = Voucher.objects.filter(campaign__id=kwargs['campaign_id'],
                                              end_user_profile__secret_key=secret_key)
            serializer = UseVoucherSerializer(vouchers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('Voucher does not exist', status=status.HTTP_404_NOT_FOUND)
