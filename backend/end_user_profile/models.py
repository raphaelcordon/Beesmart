import random
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

import segno
from django.core.files.base import ContentFile
from io import BytesIO

User = get_user_model()


def code_generator(length=15):
    numbers = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    return ''.join(random.choice(numbers) for _ in range(length))


def avatar_directory_path(instance, filename):
    return f'user_avatar/{instance.id}/{filename}'


def end_user_qr_directory_path(instance, filename):
    return f'user_qr/{instance.user.email}/{filename}'


# Create your models here.
class EndUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='end_user_profile')
    code = models.CharField(max_length=15, unique=True, default=code_generator)
    secret_key = models.CharField(max_length=15, unique=True, default=code_generator)
    first_name = models.CharField(verbose_name='first name', max_length=80, blank=True)
    last_name = models.CharField(verbose_name='last name', max_length=80, blank=True)
    city = models.CharField(verbose_name='city', max_length=60, blank=True)
    street = models.CharField(verbose_name='street', max_length=100, blank=True)
    zip = models.CharField(verbose_name='zip', max_length=10, blank=True)
    avatar = models.ImageField(verbose_name='avatar', upload_to=avatar_directory_path, blank=True)
    qr_code = models.ImageField(upload_to=end_user_qr_directory_path, blank=True)

    def save(self, *args, **kwargs):
        if self.pk:
            if EndUserProfile.objects.filter(pk=self.pk).exists():
                old_instance = EndUserProfile.objects.get(pk=self.pk)
                if old_instance.qr_code and old_instance.qr_code != self.qr_code:
                    old_instance.qr_code.delete(save=False)
        print('secret_key', self.secret_key)
        qr = segno.make(f'"{self.secret_key}"')
        buffer = BytesIO()
        qr.save(buffer, kind='png', scale=5)
        filename = f'qr_{self.user}.png'
        if self.qr_code:
            self.qr_code.delete(save=False)  # Delete the old file if it exists
        self.qr_code.save(filename, ContentFile(buffer.getvalue()), save=False)
        super().save(*args, **kwargs)


@receiver(post_save, sender=User)
def create_registration_profile(sender, instance, **kwargs):
    if not instance.is_customer:
        EndUserProfile.objects.get_or_create(user=instance)
