# from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import UpdateAPIView
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
