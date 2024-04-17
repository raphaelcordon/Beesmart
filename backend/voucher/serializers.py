from rest_framework import serializers

from voucher.models import Voucher


class UseVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = '__all__'
        read_only_fields = ['id', 'name', 'expiration_date', 'campaign', 'end_user_profile']
