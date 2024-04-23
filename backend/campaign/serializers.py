from datetime import date

from rest_framework import serializers

from campaign.models import Campaign, CampaignStyle, CollectorType
from customer_user_profile.serializers import CustomerUserProfileSerializer


class CollectorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectorType
        fields = '__all__'


class CampaignSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = ['id', 'is_active', 'name', 'style', 'value_goal', 'beginning_date', 'ending_date', 'image', 'logo',
                  'customer_user_profile', 'collector_type']
        read_only_fields = ['id', 'customer_user_profile', ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer_user_profile'] = CustomerUserProfileSerializer(instance.customer_user_profile,
                                                                                many=False).data
        return representation

    def get_is_active(self, obj):
        # Ensure that ending_date is not None
        if obj.ending_date:
            # Get today's date using the correct class
            today_date = date.today()

            # Compare the ending_date directly to today's date
            if obj.ending_date <= today_date:
                return False
        return True


class CampaignStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignStyle
        fields = ['style_name']
        read_only_fields = ['id']
