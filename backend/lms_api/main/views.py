from django.http import HttpRequest, JsonResponse
from django.db.models.sql.constants import LOUTER
from django.db.models import OuterRef, Subquery, Value, Exists
from django.db.models.functions import Coalesce
import socket
from django.db.models import Q
from django.template.loader import render_to_string
def get_server_ip(request):
    ip_address = socket.gethostbyname(socket.gethostname())
    return JsonResponse({'ip_address': ip_address})
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_str
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from . serializer import  AssessmentSerializer, AssessmentSubmissionSerializer, AssessmentTypeSerializer, AssessmentWithSubmissionCountSerializer, AttendanceSerializer, ChatMessageSerializer, StudentAnnouncementSerializer, StudentAssessmentListSerializer, StudentAttendanceSerializer, StudentProfileSerializer, StudentSignUpSerializer, TeacherSerializer, TeacherSerializerUser, UserStudentSerializer
from . serializer import CourseCategorySerializer, TeacherSignUpSerializer
from . serializer import CourseSerializer,ChapterSerializer,StudentSerializer,StudentEnrollCourseSerializer,TeacherDashboardSerializer,NotificationSerializer,AssessmentSubmissionSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
from . import models
from django.db.models import Count,Sum
from rest_framework import serializers
import django_filters 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework import status
from django_filters import rest_framework   
# Create your views here.

class TeacherList(generics.ListCreateAPIView):
   queryset=models.Teacher.objects.all()
   serializer_class=TeacherSerializer
   permission_classes=[permissions.IsAuthenticated]
        
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset=models.Teacher.objects.all()
   serializer_class=TeacherSerializer
   permission_classes=[permissions.IsAuthenticated]

class TeacherDashbaord(generics.RetrieveAPIView):
   queryset=models.Teacher.objects.all()
   serializer_class=TeacherDashboardSerializer
   permission_classes=[permissions.IsAuthenticated]

class StudentList(generics.ListCreateAPIView):
   queryset=models.Student.objects.all()
   serializer_class=StudentSerializer
   permission_classes=[permissions.IsAuthenticated]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset=models.Student.objects.all()
   serializer_class=StudentSerializer

@csrf_exempt
def student_login(request):
   email_id=request.POST['email_id']
   password=request.POST['password']
   try:
       studentData=models.Student.objects.get(email_id=email_id,password=password)
   except models.Student.DoesNotExist:
         studentData=None
   if studentData:
      return JsonResponse({'bool':True,'student_id':studentData.id})
   else:
      return JsonResponse({'bool':False})
   
# @csrf_exempt
# def student_register(request : HttpRequest):
#    data = request.POST
#    serializer =  StudentSerializer(data = request)
#    if serializer.is_valid():
#       serializer.save()
#       return Response( data ={ message  : f"{serializer.data.fullname}"})
#    else:
#       return Response(data=serializer.error_messages, status=status.HTTP_422_UNPROCESSABLE_ENTITY,exception=True)



class CategoryList(generics.ListCreateAPIView):
   queryset=models.CourseCategory.objects.all()
   serializer_class=CourseCategorySerializer
   # permission_classes = [IsAuthenticated]


# Course List Teacher
class CourseList(generics.ListCreateAPIView):
   serializer_class=CourseSerializer
   filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
   permission_classes = [IsAuthenticated]
   def get_queryset(self):
          teacher  = self.request.query_params.get('teacher')
          return models.Course.objects.filter(teacher_id = teacher)

class CourseListStudent(generics.ListCreateAPIView):
   serializer_class=CourseSerializer
   filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
   permission_classes = [IsAuthenticated]
   def get_queryset(self):
          student  = self.request.query_params.get('student')
          course_ids =  models.StudentCourseEnrollment.objects.filter(student_id = student).values_list('course_id')
          return models.Course.objects.filter(pk__in = course_ids)

# Student By Course
class StudentBYCourseListView(generics.ListCreateAPIView):
   serializer_class=UserStudentSerializer
   filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
   permission_classes = [IsAuthenticated]
   def get_queryset(self):
          course  = self.request.query_params.get('course')
          user_ids = models.StudentCourseEnrollment.objects.filter(course_id = course).values_list('student__user_id')
          return models.AuthUser.objects.filter(pk__in=user_ids)

class TeacherByStudent(generics.ListAPIView):
   serializer_class=UserStudentSerializer
   filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
   permission_classes = [IsAuthenticated]
   def get_queryset(self):
          student  = self.request.query_params.get('student')
          user_ids = models.StudentCourseEnrollment.objects.filter(student_id = student).values_list('course__teacher__user_id')
          return models.AuthUser.objects.filter(pk__in=user_ids)





class TeacherCourseList(generics.ListCreateAPIView):
   
   serializer_class=CourseSerializer
   def get_queryset(self):
      teacher_id=self.kwargs['teacher_id']
      teacher=models.Teacher.objects.get(pk=teacher_id)
      return models.Course.objects.filter(teacher=teacher)

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
      queryset=models.Course.objects.all()
      serializer_class=CourseSerializer
   

@csrf_exempt
def teacher_login(request):
   email_id=request.POST['email_id']
   password=request.POST['password']
   try:
       teacherData=models.Teacher.objects.get(email_id=email_id,password=password)
   except models.Teacher.DoesNotExist:
         teacherData=None
   if teacherData:
      return JsonResponse({'bool':True,'teacher_id':teacherData.id})
   else:
      return JsonResponse({'bool':False})



class ChapterList(generics.ListCreateAPIView):
   queryset=models.Chapter.objects.all()
   serializer_class=ChapterSerializer



class CourseChapterList(generics.ListAPIView):
   
   serializer_class=ChapterSerializer 

   def get_queryset(self):
      course_id=self.kwargs['course_id']
      course=models.Course.objects.get(pk=course_id)
      return models.Chapter.objects.filter(course=course)


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
   queryset=models.Chapter.objects.all()
   serializer_class=ChapterSerializer


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
   queryset=models.Course.objects.all()
   serializer_class=CourseSerializer

# views.py


class StudentEnrolledCourseList(generics.ListCreateAPIView):
   queryset=models.StudentCourseEnrollment.objects.all()
   serializer_class=StudentEnrollCourseSerializer

class StudentEnrolledCourseDetailList(generics.RetrieveUpdateDestroyAPIView):
   queryset=models.StudentCourseEnrollment.objects.all()
   serializer_class=StudentEnrollCourseSerializer

class EnrolledStudentList(generics.ListAPIView):

   queryset=models.StudentCourseEnrollment.objects.all()
   serializer_class=StudentEnrollCourseSerializer

   def get_queryset(self):
      if 'course_id' in self.kwargs:
         course_id=self.kwargs['course_id']
         course=models.Course.objects.get(pk=course_id)
         return models.StudentCourseEnrollment.objects.filter(course=course) 
      elif 'teacher_id' in self.kwargs:
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher)
      elif 'student_id' in self.kwargs:
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)
        return models.StudentCourseEnrollment.objects.filter(student=student)
# Assessment
class AssessmentsView(generics.RetrieveUpdateDestroyAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentSerializer
      permission_classes = [IsAuthenticated]
      
      
class AssessmentsListCreateView(generics.ListCreateAPIView):
      queryset = models.Assessment.objects.all()
      serializer_class= AssessmentSerializer
      filter_backends = [rest_framework.DjangoFilterBackend]
      def get_queryset(self):
          teacher  = self.request.query_params.get('teacher')
          assessment_type  = self.request.query_params.get('assessmentType')
          return models.Assessment.objects.filter(teacher_id = teacher,assessment_type_id=assessment_type)

# Student Assessment  View 
class StudentAssessmentsList(generics.ListAPIView):
      queryset = models.Assessment.objects.all()
      serializer_class= StudentAssessmentListSerializer
      permission_classes = [IsAuthenticated]
      filter_backends = [rest_framework.DjangoFilterBackend]
      def get_queryset(self):
          course  = self.request.query_params.get('course')
          assessment_type  = self.request.query_params.get('assessmentType')
          if course is None: 
            student =  models.Student.objects.get(user = self.request.user)
            course_ids =  models.StudentCourseEnrollment.objects.filter(student = student).values_list('course_id')
            return models.Assessment.objects.filter(
    assessment_type_id=assessment_type,
    course_id__in=course_ids
).annotate(
    is_assessment_submitted=Exists(
        models.AssessmentSubmission.objects.filter(
            student=student,
            assessment=OuterRef('pk')  # Refers to the primary key of the outer Assessment object
        )
    )
)         
          return models.Assessment.objects.filter(course_id = course,assessment_type_id=assessment_type)



# Assessment ExamList
class AssessmentExamList(generics.ListAPIView):
    queryset = models.Assessment.objects.all()
    serializer_class= AssessmentSerializer
    filter_backends = [rest_framework.DjangoFilterBackend]
    def get_queryset(self):
          teacher  = self.request.query_params.get('teacher')
          return models.Assessment.objects.filter(teacher_id = teacher,assessment_type_id__in=[3,4,5])

          
          
def fetch_enroll_status(request,student_id,course_id):
  student=models.Student.objects.filter(id=student_id).first()
  course=models.Course.objects.filter(id=course_id).first()
  enrollstatus=models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
  if enrollstatus:
      return JsonResponse({'bool':True})
  else:
      return JsonResponse({'bool':False})



class StudentAssignmentList(generics.ListAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentWithSubmissionCountSerializer

      def get_queryset(self):
      
         course_id=self.kwargs['course_id']
         teacher_id=self.kwargs['teacher_id']
         assessment_type_id=self.kwargs['assessment_type_id']
         
         teacher=models.Teacher.objects.get(pk=teacher_id)
         course=models.Course.objects.get(pk=course_id)
         return models.Assessment.objects.filter(course=course,teacher=teacher,assessment_type_id = assessment_type_id).annotate(num_submissions=Count('assessmentsubmission'))
      

class StudentAssessmentCreate(generics.CreateAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentSerializer

class StudentAssessmentUpdate(generics.RetrieveUpdateAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentSerializer
   

                  
class AssessmentType(generics.ListCreateAPIView):
      queryset=models.AssessmentType.objects.all()
      serializer_class=AssessmentTypeSerializer


@csrf_exempt
def teacher_change_password(request,teacher_id):
   password=request.POST['password']
   try:
       teacherData=models.Teacher.objects.get(id=teacher_id)
   except models.Teacher.DoesNotExist:
         teacherData=None
   if teacherData:
      models.Teacher.objects.filter(id=teacher_id).update(password=password)
      return JsonResponse({'bool':True})
   else:
      return JsonResponse({'bool':False})


class TeacherGetView(generics.RetrieveAPIView):
      queryset=models.Teacher.objects.all()
      serializer_class = TeacherSerializerUser
      permission_classes = [IsAuthenticated]

class StudentAssessmentUpdate(generics.RetrieveUpdateAPIView):
      queryset=models.Assessment.objects.all()
      



class myAssignmentList(generics.ListCreateAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentSerializer

      def get_queryset(self):
      
         course_id=self.kwargs['course_id']
         assessment_type_id=self.kwargs['assessment_type_id']
         return models.Assessment.objects.filter(course_id=course_id,assessment_type_id=assessment_type_id)

class UpdateAssignmentList(generics.RetrieveUpdateDestroyAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class=AssessmentSerializer

class DeleteAssignmentList(generics.RetrieveUpdateDestroyAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class=AssessmentSerializer

class myExamList(generics.ListCreateAPIView):
      queryset=models.Assessment.objects.all()
      serializer_class= AssessmentSerializer

      def get_queryset(self):
         course_id=self.kwargs['course_id']
         return models.Assessment.objects.filter(assessment_type_id__in=[3,4,5],course_id=course_id)


# class SubmittedAssignmentList(generics.ListCreateAPIView):s
#     queryset = models.SubmittedAssignment.objects.all()
#     serializer_class = SubmittedAssignmentSerializer

#     def get_queryset(self):
#         assignment_id = self.kwargs['assignment_id']
#         try:
#             assignment = models.StudentAssignment.objects.get(id=assignment_id)
#             return models.SubmittedAssignment.objects.filter(assignment=assignment)
#         except models.StudentAssignment.DoesNotExist:
#             return models.SubmittedAssignment.objects.none()


# class SubmittedAssignmentDetail1(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.SubmittedAssignment.objects.all()
#     serializer_class = SubmittedAssignmentSerializer

#     def get_queryset(self):
#         assignment_id = self.kwargs.get('assignment_id')
#         student_assignment = models.StudentAssignment.objects.get(pk=assignment_id)
        
#         student_id = self.kwargs['student_id']
#         student = models.Student.objects.get(pk=student_id)
#         course_id = self.kwargs['course_id']
#         course = models.Course.objects.get(pk=course_id)
#         models.Notification.objects.filter(student=student,course=course,notif_for='student',notif_subject='assignment').update(notifiread_status=True)
#         return models.SubmittedAssignment.objects.filter(assignment=student_assignment)

class SubmittedAssignmentListAndCreate(generics.ListCreateAPIView):
    queryset = models.AssessmentSubmission.objects.all()
    serializer_class = AssessmentSubmissionSerializer

    def get_queryset(self):
        assessment_id = self.request.query_params.get('assessment',None)
        student_id = self.request.query_params.get('student',None)
        return models.AssessmentSubmission.objects.filter(Q(pk=assessment_id) &  Q(student_id=student_id))


class SubmittedAssignmentListByAssessment(generics.ListAPIView):
    queryset = models.AssessmentSubmission.objects.all()
    serializer_class = AssessmentSubmissionSerializer

    def get_queryset(self):
        assessment_id = self.request.query_params.get('assessment',None)
        return models.AssessmentSubmission.objects.filter(Q(assessment_id=assessment_id))





class SubmittedAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.AssessmentSubmission.objects.all()
    serializer_class = AssessmentSubmissionSerializer

class SubmittedAssignmentListByAssessment(generics.ListAPIView):
    queryset = models.AssessmentSubmission.objects.all()
    serializer_class = AssessmentSubmissionSerializer

    def get_queryset(self):
        assessment_id=self.request.query_params.get('assessment', None)
        return models.AssessmentSubmission.objects.filter(assessment_id=assessment_id,isSubmitted=True)







@api_view(['GET'])
def get_submitted_assessments_by_student(request):
    student_id = request.query_params.get('student', None)
    assessment_id = request.query_params.get('assessment', None)
    try:
         submitted_assessment = models.AssessmentSubmission.objects.get(assessment_id=assessment_id,student_id=student_id)
    except models.AssessmentSubmission.DoesNotExist:
      return Response(data=None, status=status.HTTP_404_NOT_FOUND)   
   
    serializer = AssessmentSubmissionSerializer(submitted_assessment)
    return Response(data = serializer.data, status=status.HTTP_200_OK)



class StudentAssessmentListView(generics.ListAPIView):
    queryset = models.Assessment.objects.all()
    serializer_class = AssessmentSerializer 
    def get_queryset(self):
        # Get query parameters
        course_id = self.request.query_params.get('course_id', None)
        teacher_id = self.request.query_params.get('teacher_id', None)
        assessment_type_id = self.request.query_params.get('assessment_type_id', None)
        assessment_id = self.request.query_params.get('assessment_id', None)
         
        # Filter assessments based on query parameters
        assessments = models.Assessment.objects.all().filter(Q(course_id=course_id)| Q(teacher_id = teacher_id)| Q(pk = assessment_id) | Q(assessment_type_id = assessment_type_id) )
      
      #   serializer = AssessmentSerializer(assessments, many=True)
      #   return Response(serializer.data, status=status.HTTP_200_OK)
        return assessments


        
# class NotificationList(generics.ListCreateAPIView):
#     queryset = models.Notification.objects.all()
#     serializer_class = NotificationSerializer

#     def get_queryset(self):
#         teacher_id = self.request.query_params.get('teacher_id', None)
#         student_id = self.request.query_params.get('student_id', None)

#         return models.Notification.objects.filter(student_id=student_id,teacher_id=teacher_id)
 
class ChatMessageList(generics.ListCreateAPIView):
    queryset = models.ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    def get_queryset(self):
        teacher_id = self.request.query_params.get('teacher', None)
        student_id = self.request.query_params.get('student', None)
        return models.ChatMessage.objects.filter(student_id=student_id,teacher_id=teacher_id).order_by('timestamp')
 
  
class NotificationList(generics.ListAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']            
        return models.Notification.objects.filter(student_id=student_id).order_by('-pk').values()[:10]

class NotificationUpdate(generics.UpdateAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer



class AttendanceCreate(generics.ListCreateAPIView):
    queryset = models.Attendance.objects.all()
    serializer_class = AttendanceSerializer
   #  def post(self, request: HttpRequest, *args, **kwargs):
   #      teacher = models.Teacher.objects.get(user=request.user)
   #      attendance=  models.Attendance.objects.create(teacher=teacher,student=request.POST.get('student'),course=request.POST.get('course')).save()
   #      serializer =  AttendanceSerializer(data=attendance,many=False)
   #      return Response(data=serializer.data,status=status.HTTP_200_OK)

   
@api_view(['GET'])
def attendance(request):
        marked_by_teacher_id = request.query_params.get('teacher', None)
        course_id = request.query_params.get('course', None)
        date = request.query_params.get('date', None)
        all_attendances = models.Attendance.objects.filter(student=OuterRef('pk'),marked_by_teacher_id=marked_by_teacher_id,course_id=course_id,date=date)
        enrolled_students = models.StudentCourseEnrollment.objects.filter(course_id=course_id).values_list('student_id')
        students =  models.Student.objects.filter(pk__in=enrolled_students).annotate(is_present=Coalesce(
        Subquery(all_attendances.values('is_marked')[:1]),  
        Value(False)))
        serializer = StudentAttendanceSerializer(students,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

        


@api_view(['GET'])
def allAssessmentsIncompleteCount(request):
   student_id = request.query_params.get('student_id', None)
#    course_id = request.query_params.get('course_id', None)
#    teacher_id = request.query_params.get('teacher_id', None)
   # assessment_type_id = request.query_params.get('assessment_type_id', None)
#    assessment_id = request.query_params.get('assessment_id', None)
   student_courses_ids = models.StudentCourseEnrollment.objects.filter(student_id=student_id).values_list('course_id',flat=True)
   total_assessmentCount = models.Assessment.objects.filter(course_id__in = student_courses_ids ).count()
   student_assessment_ids = models.Assessment.objects.filter(course_id__in = student_courses_ids ).values_list('id',flat=True)
   submitted_count = models.AssessmentSubmission.objects.filter(Q(assessment_id__in=student_assessment_ids,student_id=student_id) ).count()
   count = total_assessmentCount -  submitted_count
   return Response(data = {"assessments_counts" : count}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAssessment(request,assessment_id):
   assessment = models.Assessment.objects.get(pk=assessment_id)
   
   serializer = AssessmentSerializer(assessment)
   return Response(data = serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def assessmentBYCourseAndAssessmentType(request):
   student_id = request.query_params.get('student_id', None)
   assessment_type_id = request.query_params.get('assessment_type_id', None)
   student_courses_ids = models.StudentCourseEnrollment.objects.filter(student_id=student_id).values_list('course_id',flat=True)
   course_assessment_count = models.Assessment.objects.select_related('course').filter(course_id__in = student_courses_ids, assessment_type_id =assessment_type_id ).values('course').annotate(course_assessment_count=Count('pk'))
   return Response(data = course_assessment_count, status=status.HTTP_200_OK)
   # assessment = models.Assessment.objects.values()
# @api_view(['GET'])
# def checkAssessmentExists(request):
   
#    student_id = request.query_params.get('student_id', None)
#    assessment_id = request.query_params.get('assessment_id', None)
#    exists = models.AssessmentSubmission.objects.filter(assessment_id=assessment_id,student_id=student_id).exists()
#    return Response(data = {"exists" : }, status=status.HTTP_200_OK)


@api_view(['GET'])
def checkIfExamAssessmentExists(request:HttpRequest,course_id):
    existing_exams_ids = models.Assessment.objects.filter(course_id=course_id,assessment_type_id__in = [3,4,5]).values_list('assessment_type_id',flat=True)
    distinct_exams_ids = set(existing_exams_ids)
    return Response(data = {"existing_exam_count" : distinct_exams_ids}, status=status.HTTP_200_OK)




class AnnouncementsList(generics.ListAPIView):
    queryset = models.StudentAnnouncement.objects.all()
    serializer_class = StudentAnnouncementSerializer

    def get_queryset(self):
        return models.StudentAnnouncement.objects.filter(isFeatured=True).order_by('-pk').values()[0]

@api_view(['GET'])
def getAnnouncements(request):
       announcement = models.StudentAnnouncement.objects.filter(isFeatured=True).order_by('-pk')
       serializer = StudentAnnouncementSerializer(announcement,many=True)
       return Response(data = serializer.data, status=status.HTTP_200_OK)

#Student Profile
class StudentProfileUpdateView(generics.UpdateAPIView):
    serializer_class = StudentSignUpSerializer
    queryset = models.AuthUser.objects.all()


class SignUpStudentView(generics.GenericAPIView):
    serializer_class = StudentSignUpSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        

        current_site = f'http://localhost:5173/verify-account-student?uid={urlsafe_base64_encode(force_bytes(user.pk))}&token={default_token_generator.make_token(user)}'
        subject = 'Activate Your Account'
        body = render_to_string(
            'email_verification.html',
            {
                'domain': current_site,
                            'user': user,

            }
        )
        email = EmailMessage(to=[user.email], subject=subject, body=body)
        email.content_subtype = 'html'  # Ensure HTML content type for email

        if email.send():
         return Response(data={'message': f'confirm the email by clicking on link sent to {user.email}'},status=status.HTTP_200_OK)
        else:
           return Response(data={'detail': f'Problem sending confirmation email to {user.email}, check if you typed it correctly.'},status=status.HTTP_400_BAD_REQUEST)



# Teacher Profile

class SignUpTeacher(generics.GenericAPIView):
    serializer_class = TeacherSignUpSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        

        current_site = f'http://localhost:5173/verify-account?uid={urlsafe_base64_encode(force_bytes(user.pk))}&token={default_token_generator.make_token(user)}'
        subject = 'Activate Your Account'
        body = render_to_string(
            'email_verification.html',
            {
                'domain': current_site,
                            'user': user,

            }
        )
        email = EmailMessage(to=[user.email], subject=subject, body=body)
        email.content_subtype = 'html'  # Ensure HTML content type for email

        if email.send():
         return Response(data={'message': f'confirm the email by clicking on link sent to {user.email}'},status=status.HTTP_200_OK)
        else:
           return Response(data={'detail': f'Problem sending confirmation email to {user.email}, check if you typed it correctly.'},status=status.HTTP_400_BAD_REQUEST)

class UpdateTeacherProfileView(generics.UpdateAPIView):
    serializer_class = TeacherSignUpSerializer
    queryset = models.AuthUser.objects.all()
    


@api_view(['GET'])
def activate(request):
    try:
        uidb64 = request.query_params.get('uid', None)
        token = request.query_params.get('token', None)
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = models.AuthUser.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, models.AuthUser.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_verified = True
        user.is_active = True
        user.save()

        return Response(data = { 'message': 'Congratulation your account has been confirmed. Now you can login your account.'},status=status.HTTP_200_OK)
   
    return Response(data= {'detail':'Activation link is invalid!'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([IsAuthenticated])    
def get_current_user(request):
   serializer = UserStudentSerializer(request.user,many=False)
   return Response(data=serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])    
def get_current_teacher_user(request,):
   teacher = models.Teacher.objects.get(user=request.user)
   serializer = TeacherSerializer(teacher,many=False)
   return Response(data=serializer.data,status=status.HTTP_200_OK)

class StudentProfileView(generics.RetrieveUpdateAPIView):
   serializer_class = StudentProfileSerializer
   queryset = models.Student.objects.all()