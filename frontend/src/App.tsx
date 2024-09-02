import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContentLoader from "./component/Loader/MainContentLoader";
import LayoutLoader from "./component/Loader/LayoutLoader";
import StoreProvider from "./utils/Providers/StoreProvider";
import { Toaster } from "./@/components/ui/sonner";
import Protected from "./component/Protected";
import Anonymous from "./component/Anonymous";
const  ResetPassword =    React.lazy(()=> import ("./component/ResetPassword/ResetPassword"))
const Layout = React.lazy(() => import("./container/Teacher/Layout"));
const StudentLayout = React.lazy(() => import("./container/Student/StudentLayout"));
const Dashboard = React.lazy(() => import("./component/Dashboard/Dashboard"));
const StudentDashboard = React.lazy(() => import("./component/StudentDashboard/StudentDashboard"));
const Setting = React.lazy(() => import("./pages/Setting"));
const Login = React.lazy(() => import("./pages/LoginPage"));
const StudentLoginPage = React.lazy(() => import("./pages/StudentLoginPage"));
const StudentSignupPage = React.lazy(() => import("./pages/StudentSignupPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const AccountRecoveryPage = React.lazy(() => import("./pages/AccountRecoveryPage"));
const UnAuthorizedPage = React.lazy(() => import("./pages/UnAuthorizedPage"));
const UserList = React.lazy(() => import("./component/User/UserList/UserList"));
const CourseList = React.lazy(() => import("./component/Course/Course"));
const CourseAttendanceList = React.lazy(() => import("./component/CourseAttendance/CourseAttendance"));
const AssignmentList = React.lazy(() => import("./component/Assignment/Assignment"));
const QuizList = React.lazy(() => import("./component/Quiz/Quiz"));
const ExamList = React.lazy(() => import("./component/Exam/Exam"));
const StudentListByCourse = React.lazy(() => import("./component/Student/Student"));
const UserSetting = React.lazy(() => import("./component/ProfileSetting/ProfileSetting"));
const StudentProfileSetting = React.lazy(() => import("./component/StudentProfile/StudentProfile"));
const Signup = React.lazy(() => import("./pages/Signup"));
const AccountConfirmation = React.lazy(() => import("./pages/AccountConfirmationPage"));
const StudentAccountConfirmation = React.lazy(() => import("./pages/StudentAccountConfirmationPage"));

const StudentAssignmentList = React.lazy(() => import("./component/StudentAssessments/StudentAssignment"));
const AssessmentSubmissions = React.lazy(() => import("./component/AssessmentSubmissions/AssessmentSubmission"));
const StudentChat = React.lazy(() => import("./component/Chat/StudentChat"));
const TeacherChat = React.lazy(() => import("./component/Chat/Chat"));
const StudentAttendanceList = React.lazy(() => import("./component/Attendance/Attendance"));
const StudentQuizList = React.lazy(() => import("./component/StudentAssessments/StudentQuiz"));
const StudentExamList = React.lazy(() => import("./component/StudentAssessments/StudentExam"));
const StudentTeacherList = React.lazy(() => import("./component/Teacher/Teacher"));
const StudentAssessmentDetails = React.lazy(() => import("./component/StudentAssessments/StudentAssessmentDetails"));


function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <StoreProvider>
            <Routes>
            

              {/* Student dashboard layout */}
               <Route element={<Protected allowedRoles={["student"]} />}>
                <Route path="/student" element={<StudentLayout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/student/setting"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <Setting />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/chat"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentTeacherList />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-setting"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentProfileSetting />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-assignment"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentAssignmentList />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-quiz"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentQuizList />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-chat/:teacherId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentChat />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-exam"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentExamList />
                      </Suspense>
                    }
                  /> 
                  <Route
                    path="/student/student-assessment-detail/:assessmentId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentAssessmentDetails />
                      </Suspense>
                    }
                  /> 
                </Route>
              </Route>

  {/* Teacher dashboard layout */}
              <Route element={<Protected allowedRoles={["teacher"]} />}>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/setting"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <Setting />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/assessment-submissions/:assessmentId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <AssessmentSubmissions />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/student-list/:courseId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentListByCourse />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/attendance-list/:courseId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <StudentAttendanceList />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/AttendanceList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <CourseAttendanceList />
                      </Suspense>
                    }
                  />
                  
                  <Route
                    path="/UserList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <UserList />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/teacher-chat/:studentId"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <TeacherChat />
                      </Suspense>
                    }
                  />
                    <Route
                    path="/CourseList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <CourseList />
                      </Suspense>
                    }
                  />
                    <Route
                    path="/AssignmentList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <AssignmentList />
                      </Suspense>
                    }
                  />
                   <Route
                    path="/QuizList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <QuizList />
                      </Suspense>
                    }
                  />
                   <Route
                    path="/ExamList"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <ExamList />
                      </Suspense>
                    }
                  />
                  
                   <Route
                    path="/ProfileSetting"
                    element={
                      <Suspense fallback={<MainContentLoader />}>
                        <UserSetting />
                      </Suspense>
                    }
                  />
                  
                </Route>
              </Route>

              <Route path="/teacher-login"  element={<Login />} />
              <Route path="/teacher-signup" element={<Signup />} />
              {/* Student Routes */}
            <Route path="/student-signup" element={<StudentSignupPage />} />
            <Route path="/student-login"  element={<StudentLoginPage />} />
              {/* Extra Routes */}
              <Route path="/reset-password" element={<ResetPassword/> } />
              <Route path="/unauthorized" element={<UnAuthorizedPage />} />
              <Route path="/account-recovery" element={<AccountRecoveryPage />} />
              <Route path="/verify-account" element={<AccountConfirmation />} />
              <Route path="/verify-account-student" element={<StudentAccountConfirmation />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster richColors position="top-right" />
          </StoreProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
