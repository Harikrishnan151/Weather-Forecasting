# Generated by Django 5.0.2 on 2024-04-02 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weatherapp', '0006_post_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emergency',
            name='phone_number',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
