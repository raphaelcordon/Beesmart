import random

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


def logo_directory_path(instance, filename):
    return f'business_logo/{instance.id}/{filename}'


def customer_user_qr_directory_path(instance, filename):
    return f'business_qr/{instance.id}/{filename}'


# Create your models here.
class CustomerUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='customer_user_profile')
    code = models.CharField(max_length=5, unique=True, default=code_generator)
    business_name = models.CharField(verbose_name='business name', max_length=100)
    country = models.CharField(verbose_name='country', max_length=80)
    city = models.CharField(verbose_name='city', max_length=60)
    street = models.CharField(verbose_name='street', max_length=100)
    zip = models.CharField(verbose_name='zip', max_length=10)
    website = models.URLField(verbose_name='website', blank=True)
    logo = models.ImageField(verbose_name='logo', upload_to=logo_directory_path)
    qr_code = models.ImageField(upload_to=customer_user_qr_directory_path)

    def __str__(self):
        return self.business_name


@receiver(post_save, sender=User)
def create_registration_profile(sender, instance, **kwargs):
    if instance.is_customer:
        CustomerUserProfile.objects.get_or_create(user=instance)
