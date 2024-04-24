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
    return f'voucher_qr/{instance.id}/{filename}'


class Voucher(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    image = models.ImageField(upload_to=voucher_directory_path, blank=True, null=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.DO_NOTHING)
    expiration_date = models.DateField(blank=True, null=True)
    is_used = models.BooleanField(default=False)
    end_user_profile = models.ForeignKey(EndUserProfile, on_delete=models.CASCADE)
    qr_code = models.ImageField(upload_to=voucher_qr_directory_path)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        qr = segno.make(f'{self.end_user_profile.user.email}_{self.name}_{self.id}')
        buffer = BytesIO()
        qr.save(buffer, kind='png', scale=5)
        filename = f'qr_{self.name}_{self.id}.png'

        self.qr_code.save(filename, ContentFile(buffer.getvalue()), save=False)

        super().save(update_fields=['qr_code'])

    def __str__(self):
        return self.campaign.name
