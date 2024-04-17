from django.db import models

from campaign.models import Campaign
from end_user_profile.models import EndUserProfile


def voucher_directory_path(instance, filename):
    return f'voucher/{instance.id}/{filename}'


def voucher_qr_directory_path(instance, filename):
    return f'voucher/qr/{instance.id}/{filename}'


class Voucher(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    image = models.ImageField(upload_to=voucher_directory_path, blank=True, null=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.DO_NOTHING)
    expiration_date = models.DateField(blank=True, null=True)
    is_used = models.BooleanField(default=False)
    end_user_profile = models.ForeignKey(EndUserProfile, on_delete=models.DO_NOTHING)
    qr_code = models.ImageField(upload_to=voucher_qr_directory_path)

    def __str__(self):
        return self.campaign.name
