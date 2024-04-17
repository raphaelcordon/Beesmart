from django.contrib import admin

from end_user_profile.models import EndUserProfile


@admin.register(EndUserProfile)
class EndUserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'city', 'street', 'zip']
