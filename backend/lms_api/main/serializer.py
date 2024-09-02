from rest_framework import serializers
from . import models

class UserStudentSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = models.AuthUser
        fields = ['id','email','username','full_name','profile_picture','teacherId','role','studentId']
    def __init__(self, *args, **kwargs):
        super(UserStudentSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TeacherSignUpSerializer(serializers.ModelSerializer):
    qualification = serializers.CharField(write_only=True, required=True)
    skills = serializers.CharField(write_only=True, required=True)
    phone_no = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = models.AuthUser
        fields = ['full_name', 'email',
                  'username', 'password', 'phone_no','qualification','skills',
                  'profile_picture'
                  ]
        read_only_fields= ['id',]
    def create(self,validated_data):
        user = models.AuthUser.objects.create(full_name =validated_data['full_name'],email=validated_data['email'],username=validated_data['username'],
                                              profile_picture=validated_data['profile_picture'],
                                              role='teacher' )
        user.is_verified= False
        user.is_active = False
        user.set_password(validated_data['password'])
        user.save()
        teacher =  models.Teacher.objects.create(user=user,skills = validated_data['skills'],qualification = validated_data['qualification'],phone_no = validated_data['phone_no'],)
        teacher.save()
        return user
    def update(self, instance, validated_data):
        
        teacher =  models.Teacher.objects.get(user=instance)
        
        if validated_data['skills'] is not None:
             teacher.skills = validated_data['skills'] 
        if  validated_data['qualification'] is not None :
               teacher.qualification = validated_data['qualification']
        if validated_data['phone_no']  is not None:
            teacher.phone_no = validated_data['phone_no']
        teacher.save()    
        instance.full_name = validated_data['full_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']
        if 'profile_picture' in  validated_data:
            instance.profile_picture = validated_data['profile_picture']
        if validated_data['password'] is not None:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance

        
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.Teacher
            fields='__all__'
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TeacherSerializerUser(serializers.ModelSerializer):
    class Meta:
            model=models.Teacher
            fields=['id','user']
    def __init__(self, *args, **kwargs):
        super(TeacherSerializerUser,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 1
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.Teacher
            fields=['total_teacher_courses','total_teacher_chapters','total_teacher_students']
            
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.Student
            fields=['id','user']
    def __init__(self, *args, **kwargs):
        super(StudentSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1



class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.Student
            fields='__all__'
    def __init__(self, *args, **kwargs):
        super(StudentProfileSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
    

            
class StudentAttendanceSerializer(serializers.ModelSerializer):
    is_present = serializers.BooleanField()
    class Meta:
            model=models.Student
            fields=['id',"is_present",'user']
            
    def __init__(self, *args, **kwargs):
        super(StudentAttendanceSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 1
        if request and request.method == 'GET':
            self.Meta.depth = 1
            
    def create(self, validated_data):
        student =   models.Student.objects.create( **validated_data)
        student.save()
        return student      
    

        #student signup serializer
class StudentSignUpSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=True)
    phone_no = serializers.CharField(write_only=True, required=True)
    enrolledclass = serializers.IntegerField(write_only=True, required=False)
    class Meta:
        model = models.AuthUser
        fields = ['full_name', 'email',
                  'username', 'password', 'phone_no','address','enrolledclass',
                  'profile_picture'
                  ]
        read_only_fields= ['id',]
    def create(self,validated_data):
        user = models.AuthUser.objects.create(full_name =validated_data['full_name'],email=validated_data['email'],username=validated_data['username'],
                                              profile_picture=validated_data['profile_picture'],
                                              role='student' )
        user.is_verified= False
        user.is_active = False
        user.set_password(validated_data['password'])
        user.save()
        enrolled_class = models.CourseCategory.objects.get(pk =validated_data['enrolledclass'])
        # Auto Enroll on basis of selected class
        student =  models.Student.objects.create(user=user,address = validated_data['address'],phone_no = validated_data['phone_no'],enrolledclass = enrolled_class)
        student.save()
        courses = models.Course.objects.filter(category = enrolled_class )
        if courses is not  None :
            for course in courses: 
                models.StudentCourseEnrollment.objects.create(course= course,student=student).save()
        return user
    def update(self, instance, validated_data):
        
        student =  models.Student.objects.get(user=instance)
        
        if validated_data['address'] is not None:
             student.address = validated_data['address'] 
        if validated_data['phone_no']  is not None:
            student.phone_no = validated_data['phone_no']
        student.save()    
        instance.full_name = validated_data['full_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']
        if 'profile_picture' in  validated_data:
            instance.profile_picture = validated_data['profile_picture']
        if validated_data['password'] is not None:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
         
class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
            model=models.CourseCategory
            fields=['id','title','description']

class StudentEnrollCourseSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.StudentCourseEnrollment
            fields=['id','course','student','enrolled_time','category']
            
    def __init__(self, *args, **kwargs):
        super(StudentEnrollCourseSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.Course
            fields=['id','category','teacher','title','description','featured_img','total_enrolled_students']
            
    def __init__(self, *args, **kwargs):
        super(CourseSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
class ChapterSerializer(serializers.ModelSerializer):
    video = serializers.FileField(required=False)
    class Meta:
            model=models.Chapter
            fields=['id','course','title','description','video','author']
    def __init__(self, *args, **kwargs):
        super(ChapterSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

 
class AssessmentSerializer(serializers.ModelSerializer):
    assessment_material_url = serializers.FileField(required=False)
    class Meta:
            model=models.Assessment
            fields=['id','course','title','detail','add_time','teacher','assessment_type','to_time','total_marks','assessment_material_url','submission_no','course_name','category_name','assessment_type_name','teacher_name']
            
class StudentAssessmentListSerializer(serializers.ModelSerializer):
    is_assessment_submitted = serializers.BooleanField(required=False,read_only=True)
    assessment_material_url = serializers.FileField(required=False)
    class Meta:
            model=models.Assessment
            fields=['id','course','title','detail','add_time','teacher','assessment_type','to_time','total_marks','assessment_material_url','submission_no','course_name','category_name','assessment_type_name','teacher_name','is_assessment_submitted']
            

class AssessmentWithSubmissionCountSerializer(serializers.ModelSerializer):
    assessment_material_url = serializers.FileField(required=False)
    num_submissions =  serializers.IntegerField()
    class Meta:
            model=models.Assessment
            fields=['id','course','title','detail','add_time','teacher','assessment_type','to_time','total_marks','assessment_material_url','num_submissions']
            
    def __init__(self, *args, **kwargs):
        super(AssessmentWithSubmissionCountSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class AssessmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.AssessmentType
            fields=['id','name','description']


class AssessmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssessmentSubmission
        fields = ['id', 'assessment', 'isSubmitted', 'submission_time', 'isMarked','assessment_submission_url','obtained_marks','student','remarks',]

    def __init__(self, *args, **kwargs):
        super(AssessmentSubmissionSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id','description', 'student', 'date', 'read_status']

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 1
        if request and request.method == 'GET':
            self.Meta.depth = 2
            
            
            
class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
            model=models.ChatMessage
            fields=['teacher','student','message','sender']
    
    def __init__(self, *args, **kwargs):
        super(ChatMessageSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2        

class AttendanceSerializer(serializers.ModelSerializer):
    
     class Meta:
            model=models.Attendance
            fields=['student','course','is_marked','marked_by_teacher','date']
     def __init__(self, *args, **kwargs):
            super(AttendanceSerializer,self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2        
  
class StudentAnnouncementSerializer(serializers.ModelSerializer):
     class Meta:
            model=models.StudentAnnouncement
            fields=['description','to_date','isFeatured']
     def __init__(self, *args, **kwargs):
            super(StudentAnnouncementSerializer,self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2        


