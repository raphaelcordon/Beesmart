from rest_framework import serializers

from customer_user_profile.models import CustomerUserProfile


class CustomerUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUserProfile
        # Add campaigns to fields after created
        fields = ['business_name', 'country', 'city', 'street', 'zip', 'website', 'logo']


    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['campaigns'] = CampaignSerializer(instance.campaigns, many=True).data
    #     return representation
