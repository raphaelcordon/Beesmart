from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone

from campaign.models import Campaign
from collector.models import Collector, CollectorType
from collector.serializers import CollectorSerializer
from customer_user_profile.models import CustomerUserProfile
from end_user_profile.models import EndUserProfile
from voucher.models import Voucher


class CollectorValidateView(CreateAPIView):
    # Handle POST requests for the CollectorValidateView
    def post(self, request, *args, **kwargs):
        # Retrieve request data
        data = request.data
        # Safely fetch the related objects, returning 404 if not found
        collector_type = get_object_or_404(CollectorType, id=data.get('collector_type_id'))
        campaign = get_object_or_404(Campaign, id=data.get('campaign_id'))
        end_user_profile = get_object_or_404(EndUserProfile, secret_key=data.get('secret_key'))
        # Retrieve the value count from data, assuming it could be None
        value_count = data.get('value_count')

        # Validate if value_count is provided
        if not value_count:
            return Response('Missing required value count', status=status.HTTP_400_BAD_REQUEST)

        # Check if the campaign is active
        if not self.is_campaign_active(campaign):
            return Response('This Campaign is no longer available!', status=status.HTTP_400_BAD_REQUEST)

        # Check if the user making the request owns the campaign
        if not self.is_user_owner(campaign, request.user):
            return Response('You are not the owner of this campaign!', status=status.HTTP_400_BAD_REQUEST)

        # Try to get or create a collector, and handle it appropriately based on creation status
        collector, created = Collector.objects.get_or_create(
            collector_type=collector_type,
            campaign=campaign,
            end_user_profile=end_user_profile,
            is_collected=False,
            defaults={'value_counted': value_count, 'value_goal': campaign.value_goal}
        )

        # If the collector was found, not created
        if not created:
            collector.value_counted += float(value_count)
            collector.save(update_fields=['value_counted'])
            # Check if collector's total is now above the campaign goal
            if collector.value_counted >= campaign.value_goal:
                self.collect_voucher(collector)
                return Response('You reached the goal of the campaign and got the voucher', status=status.HTTP_200_OK)
            return Response('Value was added to your collector', status=status.HTTP_200_OK)
        else:
            # If the collector was created
            return Response('New collector was created', status=status.HTTP_201_CREATED)

    # Helper method to determine if a campaign is active
    def is_campaign_active(self, campaign):
        if campaign.ending_date and campaign.ending_date <= timezone.now().date():
            campaign.is_active = False
            campaign.save()
            return False
        return True

    # Helper method to check if the requesting user is the owner of the campaign
    def is_user_owner(self, campaign, user):
        return campaign.customer_user_profile == user.customer_user_profile

    # Helper method to handle the logic of collecting a voucher
    def collect_voucher(self, collector):
        collector.is_collected = True
        collector.save()
        Voucher.objects.create(
            name=collector.campaign.name,
            campaign=collector.campaign,
            end_user_profile=collector.end_user_profile,
            image=collector.campaign.image
        )


class EndUsersSpecificCampaignCollectors(ListAPIView):
    # API view to list all collectors for a specific campaign and end user identified by a secret key.
    serializer_class = CollectorSerializer
    permission_classes = [IsAuthenticated]  # Define appropriate permissions or keep empty if intentional

    def get_queryset(self):
        # Overriding the default queryset to filter collectors based on the campaign ID and secret key.
        user = self.request.user
        profile = CustomerUserProfile.objects.get(user=user)
        secret_key = self.request.data.get('secret_key')
        if not secret_key:
            return Collector.objects.none()  # Return an empty queryset if secret key is not provided

        return Collector.objects.filter(campaign__customer_user_profile=profile, end_user_profile__secret_key=secret_key)

    def list(self, request, *args, **kwargs):
        # Custom list method to handle the request and respond appropriately.
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response('No collectors exist for the given criteria.', status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
