from rest_framework import serializers

from collector.models import Collector, CollectorType
from end_user_profile.serializers import EndUserProfileSerializer


class CollectorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectorType
        fields = '__all__'


class CollectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collector
        fields = ['id', 'value_counted', 'value_goal', 'end_user_profile', 'campaign', 'is_collected', 'date_created',
                  'collector_type', ]
        read_only_fields = ['id', 'end_user_profile', 'campaign', 'collector_type', 'value_goal', 'date_created',
                            'is_collected']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['end_user_profile'] = EndUserProfileSerializer(instance.end_user_profile, many=False).data
        # representation['campaign'] = CampaignSerializer(instance.campaign, many=False).data
        representation['collector_type'] = CollectorTypeSerializer(instance.collector_type, many=False).data
        return representation
