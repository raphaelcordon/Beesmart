from rest_framework import serializers

from campaign.models import Campaign, CampaignStyle


class CampaignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = ['name', 'value_goal', 'beginning_date', 'ending_date', 'image', 'logo']
        read_only_fields = ['id', 'style', 'customer_user_profile']

        # def create(self, validated_data):
        #     validated_data['customer_user_profile'] = self.context['request'].user
        #     return super().create(validated_data)


class CampaignStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignStyle
        fields = ['style_name']
        read_only_fields = ['id']
