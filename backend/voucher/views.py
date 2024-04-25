# from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from end_user_profile.models import EndUserProfile
from voucher.models import Voucher
from voucher.serializers import UseVoucherSerializer


# Create your views here.
class UseVoucherView(CreateAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
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


class EndUsersActiveVouchers(ListAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        profile = EndUserProfile.objects.get(user=user)
        if Voucher.objects.filter(end_user_profile=profile, is_used=False).exists():
            vouchers = Voucher.objects.filter(end_user_profile=profile, is_used=False)
            serializer = UseVoucherSerializer(vouchers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('User don\'t have any vouchers.', status=status.HTTP_404_NOT_FOUND)


class EndUsersUsedVouchers(ListAPIView):
    serializer_class = UseVoucherSerializer
    queryset = Voucher.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        profile = EndUserProfile.objects.get(user=user)
        if Voucher.objects.filter(end_user_profile=profile, is_used=True).exists():
            vouchers = Voucher.objects.filter(end_user_profile=profile, is_used=True)
            serializer = UseVoucherSerializer(vouchers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('User don\'t have any vouchers.', status=status.HTTP_404_NOT_FOUND)
