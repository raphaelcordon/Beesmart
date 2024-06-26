from django.db import models

from customer_user_profile.models import CustomerUserProfile


class CampaignStyle(models.Model):
    style_name = models.CharField(max_length=100)

    def __str__(self):
        return self.style_name


def campaign_directory_path(instance, filename):
    return f'campaign/{instance.id}/{filename}'


class CollectorType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Campaign(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    value_goal = models.FloatField(blank=False, null=False)
    collector_type = models.ForeignKey(CollectorType, on_delete=models.DO_NOTHING, related_name='campaigns')
    date_created = models.DateTimeField(auto_now_add=True)
    beginning_date = models.DateField(blank=False, null=False, auto_now_add=True)
    ending_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(verbose_name='image', upload_to=campaign_directory_path, blank=True)
    logo = models.ImageField(verbose_name='logo', upload_to=campaign_directory_path, blank=True)
    style = models.ForeignKey(CampaignStyle, on_delete=models.SET_NULL, null=True, related_name='campaigns')
    customer_user_profile = models.ForeignKey(CustomerUserProfile, on_delete=models.SET_NULL, null=True,
                                              related_name='campaigns')

    def __str__(self):
        return self.name
