import random

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


def code_generator(length=15):
    numbers = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    return ''.join(random.choice(numbers) for _ in range(length))


def avatar_directory_path(instance, filename):
    return f'user_avatar/{instance.id}/{filename}'


def end_user_qr_directory_path(instance, filename):
    return f'user_qr/{instance.id}/{filename}'


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
    qr_code = models.ImageField(upload_to=end_user_qr_directory_path)


@receiver(post_save, sender=User)
def create_registration_profile(sender, instance, **kwargs):
    if not instance.is_customer:
        EndUserProfile.objects.get_or_create(user=instance)
