# Generated by Django 5.0.3 on 2024-04-16 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voucher', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='voucher',
            name='is_used',
            field=models.BooleanField(default=False),
        ),
    ]
