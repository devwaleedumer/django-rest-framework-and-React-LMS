# Generated by Django 5.0.6 on 2024-07-03 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_remove_student_password_student_user_teacher_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='email_id',
        ),
        migrations.RemoveField(
            model_name='student',
            name='full_name',
        ),
    ]
