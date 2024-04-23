from django.contrib.auth import get_user_model
from rest_framework import serializers

from customer_user_profile.models import CustomerUserProfile
from customer_user_profile.serializers import CustomerUserProfileSerializer
from end_user_profile.models import EndUserProfile
from end_user_profile.serializers import EndUserProfileSerializer

User = get_user_model()


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()


class CustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'date_joined', 'customer_user_profile']
        read_only_fields = ['id', 'email', 'date_joined', 'customer_user_profile']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer_user_profile'] = CustomerUserProfileSerializer(instance.customer_user_profile,
                                                                                many=False).data
        return representation


class CustomerUserUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUserProfile
        fields = '__all__'


class EndUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'date_joined', 'end_user_profile']
        read_only_fields = ['email', 'end_user_profile']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['end_user_profile'] = EndUserProfileSerializer(instance.end_user_profile, many=False).data
        return representation


class EndUserUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndUserProfile
        fields = '__all__'
