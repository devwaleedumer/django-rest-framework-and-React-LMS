# Generated by Django 5.0.6 on 2024-07-10 10:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_authuser_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentcourseenrollment',
            name='category',
        ),
    ]
