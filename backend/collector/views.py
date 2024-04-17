from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from campaign.models import Campaign
from collector.models import Collector, CollectorType
from collector.serializers import CollectorSerializer
from end_user_profile.models import EndUserProfile


class CollectorValidateView(CreateAPIView):
    serializer_class = CollectorSerializer
    # permission_classes = [IsBusiness]
    queryset = Collector.objects.all()

    def post(self, request, *args, **kwargs):
        data = self.request.data
        # required data: collector_type, campaign, user
        collector_type = CollectorType.objects.get(id=data['collector_type'])
        campaign = Campaign.objects.get(id=data['campaign'])
        end_user_profile = EndUserProfile.objects.get(id=data['user'])
        value_count = data['value_count']

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
            collector.value_counted = collector.value_counted + value_count
            collector.save()
            if collector.value_counted >= campaign.value_goal:
                collector.is_collected = True
                collector.save()
                # creating Voucher

                return Response('You reached the goal of the campaign and got the voucher', status=status.HTTP_200_OK)
            return Response('Value was added to your collector', status=status.HTTP_200_OK)
        else:
            collector = Collector.objects.create(collector_type=collector_type,
                                                 campaign=campaign,
                                                 end_user_profile=end_user_profile,
                                                 value_counted=value_count)
            collector.save()
            return Response('New collector was created', status=status.HTTP_201_CREATED)


class EndUsersSpecificCampaignVouchers(CreateAPIView):
    serializer_class = CollectorSerializer
    queryset = Collector.objects.all()

    def post(self, request, *args, **kwargs):
        secret_key = request.data['secret_key']
        if Collector.objects.filter(campaign__id=kwargs['pk'], end_user_profile__secret_key=secret_key).exists():
            vouchers = Collector.objects.filter(campaign__id=kwargs['pk'], end_user_profile__secret_key=secret_key)
            serializer = CollectorSerializer(vouchers)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('There is no collectors exist', status=status.HTTP_404_NOT_FOUND)
