# Generated by Django 5.0.3 on 2024-04-18 07:12

import end_user_profile.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('end_user_profile', '0002_enduserprofile_qr_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enduserprofile',
            name='qr_code',
            field=models.ImageField(blank=True, upload_to=end_user_profile.models.end_user_qr_directory_path),
        ),
    ]