# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AssessmentSubmission, Attendance, Assessment, Notification, Student, StudentCourseEnrollment

@receiver(post_save, sender=Attendance)
def notify_attendance(sender, instance, created, **kwargs):
    if created:
        
        Notification.objects.create(
            student=instance.student,
            description=f'Your  Attendance recorded:  on {instance.date} for course {instance.course.title}',
        )
        
 

@receiver(post_save, sender=Assessment)
def notify_assessment(sender, instance, created, **kwargs):
    if created:
        all_students_ids = StudentCourseEnrollment.objects.filter(course=instance.course).values_list('student',flat=True)
        all_students = Student.objects.filter(pk__in =all_students_ids )
        notifications = [Notification(student=student,description=f'New {instance.assessment_type.name} for student {student.user.full_name}: {instance.title} due on {instance.to_time}') for student in all_students]
        Notification.objects.bulk_create(notifications)


# @receiver(post_save, sender=Assessment)
# def notify_assessment(sender, instance, created, **kwargs):
#     if created:
#         all_students_ids = StudentCourseEnrollment.objects.filter(course=instance.course).values_list('student',flat=True)
#         all_students = Student.objects.filter(pk__in =all_students_ids )
#         notifications = [Notification(student=student,description=f'New {instance.assessment_type.name} for student {student.full_name}: {instance.title} due on {instance.to_time}') for student in all_students]
#         Notification.objects.bulk_create(notifications)   


@receiver(post_save, sender=AssessmentSubmission)
def notify_grading(sender, instance, created, **kwargs):        
     if not created and instance.obtained_marks is not None:
       Notification.objects.create(student=instance.student,description = f'Grade awarded for {instance.assessment.title} : {instance.obtained_marks}')
         
        