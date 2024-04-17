from datetime import date

from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from campaign.models import Campaign
from collector.models import Collector, CollectorType
from collector.serializers import CollectorSerializer
from end_user_profile.models import EndUserProfile
from project.permissions import IsBusinessOwner
from voucher.models import Voucher


class CollectorValidateView(CreateAPIView):
    serializer_class = CollectorSerializer
    # permission_classes = [IsBusinessOwner]
    queryset = Collector.objects.all()

    def post(self, request, *args, **kwargs):
        data = self.request.data
        collector_type = CollectorType.objects.get(id=data['collector_type_id'])
        campaign = Campaign.objects.get(id=data['campaign_id'])
        end_user_profile = EndUserProfile.objects.get(user__id=data['end_user_id'])
        value_count = data['value_count']

        if campaign.ending_date:
            if campaign.ending_date <= date.today():
                campaign.is_active = False
                campaign.save()
                return Response('This Campaign is no longer available!', status=status.HTTP_400_BAD_REQUEST)

        if campaign.customer_user_profile != self.request.user.customer_user_profile:
            return Response('You are not the owner of this campaign!', status=status.HTTP_400_BAD_REQUEST)

        if not all([collector_type, campaign, end_user_profile, value_count]):
            return Response('Missing required fields', status=status.HTTP_400_BAD_REQUEST)

        if Collector.objects.filter(collector_type=collector_type,
                                    campaign=campaign,
                                    end_user_profile=end_user_profile,
                                    is_collected=False).exists():
            collector = Collector.objects.get(collector_type=collector_type,
                                              campaign=campaign,
                                              end_user_profile=end_user_profile,
                                              is_collected=False)
            collector.value_counted = collector.value_counted + float(value_count)
            collector.save()
            if collector.value_counted >= campaign.value_goal:
                collector.is_collected = True
                collector.save()
                Voucher.objects.create(name=campaign.name,
                                       campaign=campaign,
                                       end_user_profile=end_user_profile,
                                       image=campaign.image)

                # creating Voucher

                return Response('You reached the goal of the campaign and got the voucher', status=status.HTTP_200_OK)
            return Response('Value was added to your collector', status=status.HTTP_200_OK)
        else:
            collector = Collector.objects.create(collector_type=collector_type,
                                                 campaign=campaign,
                                                 end_user_profile=end_user_profile,
                                                 value_counted=value_count,
                                                 value_goal=campaign.value_goal)
            collector.save()
            return Response('New collector was created', status=status.HTTP_201_CREATED)


class EndUsersSpecificCampaignCollectors(ListAPIView):
    serializer_class = CollectorSerializer
    queryset = Collector.objects.all()
    permission_classes = []

    def get(self, request, *args, **kwargs):
        secret_key = request.data['secret_key']
        if Collector.objects.filter(campaign__id=kwargs['campaign_id'], end_user_profile__secret_key=secret_key).exists():
            collectors = Collector.objects.filter(campaign__id=kwargs['campaign_id'], end_user_profile__secret_key=secret_key)
            serializer = CollectorSerializer(collectors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('There is no collectors exist', status=status.HTTP_404_NOT_FOUND)
