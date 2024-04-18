from django.contrib import admin
from .models import Campaign, CampaignStyle


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['value_goal', 'beginning_date', 'ending_date']


@admin.register(CampaignStyle)
class CampaignStyleAdmin(admin.ModelAdmin):
    list_display = ['style_name']
