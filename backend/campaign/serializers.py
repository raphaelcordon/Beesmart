from datetime import date

from django.db.models import Sum
from rest_framework import serializers

from campaign.models import Campaign, CampaignStyle, CollectorType
from collector.models import LogsCollector, Collector
from customer_user_profile.serializers import CustomerUserProfileSerializer
from end_user_profile.models import EndUserProfile
from voucher.models import Voucher


class CollectorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectorType
        fields = '__all__'


class CampaignSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()
    participants = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()
    vouchers_issued = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = ['id', 'is_active', 'name', 'style', 'value_goal', 'beginning_date', 'ending_date', 'image', 'logo',
                  'customer_user_profile', 'collector_type', 'participants', 'value', 'vouchers_issued']
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

    def get_participants(self, obj):
        return EndUserProfile.objects.filter(collectors__campaign=obj).distinct().count()
        # return obj.collectors.end_user_profile.count()

    def get_value(self, obj):
        print(obj.collector_type)
        return Collector.objects.filter(campaign=obj).distinct().aggregate(total=Sum('value_counted'))['total']

        # return obj.collectors.end_user_profile.count()

    def get_vouchers_issued(self, obj):
        return Voucher.objects.filter(campaign=obj).count()


class CampaignStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignStyle
        fields = ['style_name']
        read_only_fields = ['id']
