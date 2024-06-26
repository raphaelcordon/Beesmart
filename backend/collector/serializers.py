from datetime import date

from rest_framework import serializers

from collector.models import Collector
from end_user_profile.serializers import EndUserProfileOutSerializer


class CollectorSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Collector
        fields = ['id', 'is_active', 'value_counted', 'value_goal', 'end_user_profile', 'campaign', 'is_collected',
                  'date_created']
        read_only_fields = ['id', 'end_user_profile', 'campaign', 'value_goal', 'date_created',
                            'is_collected']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['end_user_profile'] = EndUserProfileOutSerializer(instance.end_user_profile, many=False).data
        return representation

    def get_is_active(self, obj):
        # Ensure that ending_date is not None
        if obj.campaign.ending_date:
            # Get today's date using the correct class
            today_date = date.today()

            # Compare the ending_date directly to today's date
            if obj.campaign.ending_date <= today_date:
                return False
        return True
