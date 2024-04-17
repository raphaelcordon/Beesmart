from django.contrib import admin

from customer_user_profile.models import CustomerUserProfile


@admin.register(CustomerUserProfile)
class CustomerUserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'business_name', 'country', 'city', 'street', 'zip']
