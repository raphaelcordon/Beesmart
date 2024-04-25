from rest_framework import serializers

from campaign.serializers import CampaignSerializer
from voucher.models import Voucher


class UseVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = ['id', 'image', 'name', 'expiration_date', 'campaign', 'end_user_profile', 'qr_code']
        read_only_fields = ['id', 'image', 'name', 'expiration_date', 'campaign', 'end_user_profile', 'qr_code']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['campaign'] = CampaignSerializer(instance.campaign, many=False).data
        return representation
