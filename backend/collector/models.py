from django.db import models

from backend.campaign.models import Campaign


class CollectorType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Collector(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.RESTRICT, related_name='collectors')
    collector_type = models.ForeignKey(CollectorType, on_delete=models.DO_NOTHING, related_name='collectors')
    value_counted = models.FloatField(default=0)
    value_goal = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    is_collected = models.BooleanField(default=False)

    def __str__(self):
        return self.campaign.name

    def save(self, *args, **kwargs):
        is_new = not self.pk  # Checking if this is a new instance
        super(Collector, self).save(*args, **kwargs)

        if not is_new:  # Log updates, not the creation
            LogsCollector.objects.create(collector=self)


class LogsCollector(models.Model):
    collector = models.ForeignKey('Collector', on_delete=models.DO_NOTHING, related_name='logs_collectors')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log for {self.collector} at {self.date_created}"
