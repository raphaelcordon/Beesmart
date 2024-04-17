from rest_framework import serializers

from voucher.models import Voucher


class UseVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = '__all__'