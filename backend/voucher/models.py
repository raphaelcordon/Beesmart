from django.db import models

from backend.campaign.models import Campaign
from backend.end_user_profile.models import EndUserProfile


class Voucher(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.PROTECT)
    expiration_date = models.DateField()
    end_user_profile = models.ForeignKey(EndUserProfile, on_delete=models.PROTECT)

    def __str__(self):
        return self.campaign.name
