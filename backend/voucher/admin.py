from voucher.models import Voucher
from django.contrib import admin


@admin.register(Voucher)
class VoucherAdmin(admin.ModelAdmin):
    list_display = ['name']
