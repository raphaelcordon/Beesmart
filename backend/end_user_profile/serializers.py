from rest_framework import serializers

from end_user_profile.models import EndUserProfile


class EndUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndUserProfile
        # Add campaigns to fields after created
        fields = ['secret_key', 'first_name', 'last_name', 'city', 'street', 'zip', 'avatar', 'qr_code']

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['campaigns'] = CampaignSerializer(instance.campaigns, many=True).data
    #     return representation


class EndUserProfileOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndUserProfile
        # Add campaigns to fields after created
        fields = ['user', 'first_name', 'last_name', 'city', 'street', 'zip', 'avatar', 'qr_code']
