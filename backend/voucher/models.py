import random

from django.db import models

from campaign.models import Campaign
from end_user_profile.models import EndUserProfile
import segno
from django.core.files.base import ContentFile
from io import BytesIO


def code_generator(length=15):
    numbers = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    return ''.join(random.choice(numbers) for _ in range(length))


def voucher_directory_path(instance, filename):
    return f'voucher/{instance.id}/{filename}'


def voucher_qr_directory_path(instance, filename):
    uniq = code_generator(10)
    return f'voucher_qr/{uniq}/{filename}'


class Voucher(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    image = models.ImageField(upload_to=voucher_directory_path, blank=True, null=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.DO_NOTHING)
    expiration_date = models.DateField(blank=True, null=True)
    is_used = models.BooleanField(default=False)
    end_user_profile = models.ForeignKey(EndUserProfile, on_delete=models.CASCADE)
    qr_code = models.ImageField(upload_to=voucher_qr_directory_path)

    def save(self, *args, **kwargs):
        if self.pk:
            if Voucher.objects.filter(pk=self.pk).exists():
                old_instance = Voucher.objects.get(pk=self.pk)
                if old_instance.qr_code and old_instance.qr_code != self.qr_code:
                    old_instance.qr_code.delete(save=False)
        qr = segno.make(
            f'"name":{self.name}, "campaign_id":{self.campaign.id}, "user_id":{self.end_user_profile.user.id}"')
        buffer = BytesIO()
        qr.save(buffer, kind='png', scale=5)
        filename = f'qr_{self.id}.png'
        if self.qr_code:
            self.qr_code.delete(save=False)  # Delete the old file if it exists
        self.qr_code.save(filename, ContentFile(buffer.getvalue()), save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.campaign.name
