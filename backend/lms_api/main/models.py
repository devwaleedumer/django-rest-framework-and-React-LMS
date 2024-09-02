import uuid
from django.utils.timezone import now
from django.db import models
from django.core import serializers
from django.contrib.auth.models import AbstractUser
# Create your models here.

#Custom user 
class AuthUser(AbstractUser):
    email = models.EmailField('email address', unique=True)
    full_name=models.CharField(max_length=100)
    profile_picture = models.ImageField('profile_image/', null=True)
    role = models.CharField( max_length=50)
    is_verified = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)
    class Meta:
                verbose_name_plural="14. User"
    def teacherId(self):
           try:
                teacher = Teacher.objects.get(user=self)
                return teacher.pk
           except: Teacher.DoesNotExist    
           return None
    def studentId(self):
           try:
                student = Student.objects.get(user=self)
                return student.pk
           except: Student.DoesNotExist    
           return None


# Teacher Model
class Teacher(models.Model):
        user = models.OneToOneField(AuthUser, verbose_name=("UserTeacher"), on_delete=models.CASCADE,null=True)
        detail=models.TextField(null=True)
        qualification=models.TextField()
        skills=models.TextField(null=True)
        phone_no = models.CharField( max_length=50)
        class Meta:
                verbose_name_plural="1. Teachers"

        def skill_list(self):
                if self.skills:
                        skill_list = self.skills.split(',')
                        return skill_list
                else:
                        return []
        def total_teacher_courses(self):
                total_courses=Course.objects.filter(teacher=self).count()
                return total_courses
        def total_teacher_chapters(self):
                total_Chapter=Chapter.objects.filter(course__teacher=self).count()
                return total_Chapter
        def total_teacher_students(self):
                total_students=StudentCourseEnrollment.objects.filter(course__teacher=self).count()
                return total_students
        def __str__(self):
                return f'{self.user.full_name}'
# Course Category Model
class CourseCategory(models.Model):
        title=models.CharField(max_length=150)
        description=models.TextField()

        class Meta:
                verbose_name_plural="2. Course Categories"

        def __str__(self):
                return self.title
# Course Model
class Course(models.Model):
        category=models.ForeignKey(CourseCategory,on_delete=models.CASCADE)
        teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name='teacher_courses')
        title=models.CharField(max_length=150)
        description=models.TextField()
        featured_img=models.ImageField(upload_to='course_imgs/',null=True)
        author=models.TextField(null=True)
        class Meta:
                verbose_name_plural="3. Courses"
        def related_videos(self):
                related_videos=Course.objects.filter(author__icontains=self.author)
                return serializers.serialize('json',related_videos)
        def tech_list(self):
                if self.author:
                        tech_list=self.author.split(',')
                        return tech_list
                else:
                        return []
        def total_enrolled_students(self):
                total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
                return total_enrolled_students
        def __str__(self):
                return self.title

# Student Model

class Student(models.Model):
        user = models.OneToOneField(AuthUser, verbose_name=("UserStudent"), on_delete=models.CASCADE,null=True)        
        phone_no=models.CharField(max_length=100)
        address=models.TextField()
        enrolledclass =models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='course_category_student',null=False)
        def __str__(self):
                return f'{self.user.full_name}'
        
        class Meta:
                verbose_name_plural="4. Students"

class StudentCourseEnrollment(models.Model):
        course=models.ForeignKey(Course,on_delete=models.CASCADE, related_name='enrolled_courses',null=True)
        student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
        enrolled_time=models.DateTimeField(auto_now_add=True)
        class Meta:
                verbose_name_plural="6. Enrolled Courses"

        def __str__(self):
                return f"{self.course}.{self.student}"

class Chapter(models.Model):
        course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')
       
        title=models.CharField(max_length=150)
        description=models.TextField()
        video=models.FileField(upload_to='chapter_videos/',null=True)
        author=models.TextField(null=True)
        class Meta:
                verbose_name_plural="5. Chapters"
        
        def __str__(self):
                return self.title


class AssessmentType(models.Model):
        name = models.CharField( max_length=50, null=False)       
        description = models.CharField( max_length=50, null=False)       
        class Meta:
                verbose_name_plural="7. AssessmentType"
        
        def __str__(self):
                return self.name

  
class Assessment(models.Model):
        teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
        course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)            
        assessment_type=models.ForeignKey(AssessmentType,on_delete=models.CASCADE,null=True)            
        title=models.CharField(max_length=150)
        detail=models.TextField()    
        add_time=models.DateTimeField(auto_now_add=True)
        to_time = models.DateTimeField(auto_now_add=False)
        total_marks = models.PositiveIntegerField()    
        isRead = models.BooleanField(default = False) 
        assessment_material_url = models.FileField(verbose_name="Assessment Material", upload_to="assessment")
        def submission_no(self):
                return AssessmentSubmission.objects.filter(assessment = self).count()
        def  course_name(self):
               return Course.objects.get(pk = self.course.pk).title
        def  category_name(self):
                return Course.objects.get(pk = self.course.pk).category.title
        def  teacher_name(self):
                return Teacher.objects.get(pk = self.teacher.pk).user.full_name
        def  assessment_type_name(self):
                return AssessmentType.objects.get(pk = self.assessment_type.pk).name
        class Meta:
                verbose_name_plural="8. Student Assignment"
        def __str__(self):
              return self.title

class AssessmentSubmission(models.Model):
      remarks=models.TextField(null=True, blank=True, max_length = 200)    
      assessment=models.ForeignKey(Assessment,on_delete=models.CASCADE,null=True,blank=True)
      student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True,blank=True)
      isSubmitted = models.BooleanField(default = False)
      isMarked = models.BooleanField(default = False)
      submission_time = models.DateTimeField(auto_now_add=True,null=True,blank=True)
      assessment_submission_url = models.FileField(verbose_name="Assessment Submission", upload_to="assessment_submission", blank=True, null=True)
      obtained_marks = models.PositiveIntegerField(null=True)    
      

class Notification(models.Model):  
        student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)      
        description=models.TextField()        
        date = models.DateField( auto_now_add=True)
        read_status=models.BooleanField(default=False,verbose_name='Notification Status')
        class Meta:
                verbose_name_plural="9. Notifications"

                
class CourseResult(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='results')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='results')
    class Meta:
                verbose_name_plural="10. StudentResult"

class FinalResult(models.Model):
    course_result = models.ForeignKey(CourseResult, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    is_promoted = models.BooleanField(default=False)
    class Meta:
                verbose_name_plural="11. FinalResult"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField(auto_now=False, auto_now_add=False)
    marked_by_teacher =models.ForeignKey(Teacher,on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_marked =  models.BooleanField(default=False)
    class Meta:
                verbose_name_plural="12. Attendance" 
    
class ChatMessage(models.Model):
    sender = models.CharField(max_length=7)
    teacher = models.ForeignKey(Teacher, null=True, blank=True, on_delete=models.CASCADE, related_name='sent_messages')
    student = models.ForeignKey(Student, null=True, blank=True, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message


# class Announcement(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     from_date = models.DateTimeField(auto_now_add=True)
#     to_date = models.DateTimeField()
#     isFeatured = models.BooleanField(default=False)

#     def __str__(self):
#         return self.title


# class Announcements(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     from_date = models.DateTimeField(auto_now_add=True)
#     to_date = models.DateTimeField()
#     isFeatured = models.BooleanField(default=False)

#     def __str__(self):
#         return self.title

class StudentAnnouncement(models.Model):  
        description=models.TextField()        
        from_date = models.DateTimeField( auto_now_add=True)
        isFeatured=models.BooleanField(default=False)
        to_date=models.DateTimeField()
        class Meta:
                verbose_name_plural="13. Announcement"

