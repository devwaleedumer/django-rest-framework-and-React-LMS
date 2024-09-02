from django.contrib import admin
from django.contrib.admin import models
from . import models

from django.contrib.auth.admin import UserAdmin



# register your models here.


# class StudentAdmin(admin.ModelAdmin):        
#     list_display = ('id','phone_no') #for displaying more values as columns




admin.site.register(models.Teacher)
admin.site.register(models.CourseCategory)
admin.site.register(models.Course)
admin.site.register(models.Student)
admin.site.register(models.Chapter)
admin.site.register(models.StudentCourseEnrollment)
admin.site.register(models.Assessment)
admin.site.register(models.AssessmentType)
admin.site.register(models.Notification)
admin.site.register(models.Attendance)
admin.site.register(models.CourseResult)
admin.site.register(models.FinalResult)
admin.site.register(models.AssessmentSubmission)
admin.site.register(models.StudentAnnouncement)
admin.site.register(models.AuthUser)


# class NotificationAdmin(admin.ModelAdmin):
#     list_display= ['id','notif_for', 'notif_subject', 'notifiread_status']
# admin.site.register(models.Notification,NotificationAdmin)