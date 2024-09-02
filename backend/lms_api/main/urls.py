from django.urls import path
from . import views
from .views import get_server_ip
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('teacher/', views.TeacherList.as_view()),
    path('teacher-dashboard/<int:pk>/', views.TeacherDashbaord.as_view()),
    path('teacher/<int:pk>/', views.TeacherGetView.as_view()),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher-login', views.teacher_login),

    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('student-login', views.student_login),

    path('category/', views.CategoryList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),
    # Student By Course ID
    path('student-by-course/', views.StudentBYCourseListView.as_view()),
    path('teacher-by-student/', views.TeacherByStudent.as_view()),
    
    # Course List Student
    path('student-course/', views.CourseListStudent.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    path('chapter/', views.ChapterList.as_view()),
    path('teachercourses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    path('teachercoursedetail/<int:pk>', views.TeacherCourseDetail.as_view()),

    path('student-enroll-course-forcheck/<int:student_id>', views.StudentEnrolledCourseList.as_view()),
    path('student-enroll-course/', views.StudentEnrolledCourseList.as_view()),
    path('student-enroll-course/<int:pk>', views.StudentEnrolledCourseDetailList.as_view()),
    path('fetch-allenrolled-students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    
    path('fetch-enrolled-students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch_enroll_status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-enrolled-courses/<int:student_id>', views.EnrolledStudentList.as_view()),

    path('student-assignment/<int:teacher_id>/<int:course_id>/<int:assessment_type_id>', views.StudentAssignmentList.as_view()),
    path('student-assignment/', views.StudentAssessmentCreate.as_view()),
    path('student-assignment/<int:pk>', views.UpdateAssignmentList.as_view()),
    path('my-assignments/<int:course_id>/<int:assessment_type_id>', views.myAssignmentList().as_view()),
    path('update-assignments/<int:pk>', views.UpdateAssignmentList().as_view()),
    path('delete-assignments/<int:pk>', views.DeleteAssignmentList().as_view()),
    
    
    path('assessment-types/', views.AssessmentType().as_view()),
    path('assessment-filter/', views.StudentAssessmentListView().as_view()),
    path('assessment-counts/', views.allAssessmentsIncompleteCount),
    # path('assessment/<int:assessment_id>/', views.getAssessment),
    path('get-existing-ids/<int:course_id>', views.checkIfExamAssessmentExists),
    
    # new assessment
    
    path('assessment/<int:pk>/', views.AssessmentsView.as_view()),
    path('assessment/', views.AssessmentsListCreateView.as_view()),
    # Student Assessment
    path('student-assessment/', views.StudentAssessmentsList.as_view()),
    
    # ExamList
    path('get-assessment-exam-teacher/', views.AssessmentExamList.as_view()),
    
    
    # path('submit-assignments/<int:assignment_id>', views.SubmittedAssignmentList().as_view()),
    path('submit-assignments/', views.SubmittedAssignmentListAndCreate.as_view()),
    path('submitted-assignments-by-assessment/', views.SubmittedAssignmentListByAssessment.as_view()),
    path('submit-assignments/<int:pk>/', views.SubmittedAssignment.as_view()),
    path('submitted-assignments/', views.get_submitted_assessments_by_student),
    path('submitted-assignments-by-assessment/<int:assessment_id>/', views.SubmittedAssignmentListByAssessment.as_view()),
    
    # path('student/fetch-all-notifications/<int:student_id>', views.NotificationList.as_view()),
    # Notification
    path('notifications/<int:student_id>/', views.NotificationList.as_view()),
    path('notification-update/<int:pk>/', views.NotificationUpdate.as_view()),
    
    path('exam-list/<int:course_id>', views.myExamList.as_view()),
    
    
    # 
    path('course_assessment_count/', views.assessmentBYCourseAndAssessmentType),
  
# Chat

    path('chat/', views.ChatMessageList.as_view()),
    path('attendances/', views.attendance),
    path('attendance/', views.AttendanceCreate.as_view()),


    path('get_server_ip/', get_server_ip, name='get_server_ip'),

# Announcements

    path('announcements/', views.getAnnouncements),
# Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    path('register-teacher/', views.SignUpTeacher.as_view() , name='signup-teacher' ),
    path('verify-email/', views.activate, name="email-verify"),  
    path('me/', views.get_current_user, name="current-user"),  
    path('get_teacher_by_user/', views.get_current_teacher_user, name="current-user-teacher"),
    path('get-student/<int:pk>/', views.StudentProfileView.as_view(), name="current-user-student"),
    
    # Student Authentication  
    path('register-student/', views.SignUpStudentView.as_view() , name='signup-student' ),

# Teacher Profile
    path('update-teacher-profile/<int:pk>/', views.UpdateTeacherProfileView.as_view() , name='update-teacher-profile' ),
    path('update-student-profile/<int:pk>/', views.StudentProfileUpdateView.as_view() , name='update-student-profile' ),
# Student Profile 
    # path('update-st-profile/<int:pk>/', views.UpdateTeacherProfileView.as_view() , name='update-teacher-profile' ),
]
# urls.py




