# Generated by Django 5.0 on 2023-12-12 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writing_collections', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='writingcollection',
            name='privacy_status',
        ),
        migrations.AddField(
            model_name='writingcollection',
            name='private',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='writingcollection',
            name='collection_title',
            field=models.CharField(default='Untitled', max_length=255),
        ),
    ]
