from django.contrib import admin

from .models import Collector


@admin.register(Collector)
class CollectorStyleAdmin(admin.ModelAdmin):
    list_display = ['value_counted', 'date_created', 'is_collected', 'campaign', 'end_user_profile']



