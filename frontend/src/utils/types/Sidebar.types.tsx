import { ReactNode } from "react";
import {  AssessmentIcon, AttendanceIcon, ChatIcon, CourseIcon, DashboardIcon, SettingIcon, UsersIcon } from "../Icons/SidebarIcons";

export interface SidebarMenuItem {
  title: string;
  to?: string;
  icon: ReactNode;
  hasSubmenu?: boolean;
  subMenu: SubMenu[];
}

export interface SubMenu {
    title: string;
    to: string;
  }

  // Main Teacher
export const sidebarMenuData: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    to: "/",
    icon: <DashboardIcon />,
    hasSubmenu: false,
    subMenu: null,
  },
    {
    title: "Course",
    to: "/CourseList",
    icon: <CourseIcon />,
    hasSubmenu: false,
    subMenu: null,
  },
   {
    title: "Assessment",
    icon:<AssessmentIcon />,
    hasSubmenu: true,
    subMenu: [
        {
            title: 'Quiz',
            to: '/QuizList',
        },
         {
            title: 'Assignment',
            to: '/AssignmentList',
        },
        {
            title: 'Exam',
            to: '/ExamList',
        }
    ],
    
  },
  {
    title: "Attendance",
    to: "/AttendanceList",
    icon: <AttendanceIcon />,
    hasSubmenu: false,
    subMenu: null,
  },
    {
    title: "Setting",
    to: "/ProfileSetting",
    icon: <SettingIcon />,
    hasSubmenu: false,
    subMenu: null,
  },

];



export const sidebarMenuDataStudent: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    to: "/student",
    icon: <DashboardIcon />,
    hasSubmenu: false,
    subMenu: null,
  },
    
   {
    title: "Assessment",
    icon:<AssessmentIcon />,
    hasSubmenu: true,
    subMenu: [
        {
            title: 'Quiz',
            to: '/student/student-quiz',
        },
        {
            title: 'Exam',
            to: '/student/student-exam',
        },
         {
            title: 'Assignment',
            to: '/student/student-assignment',
        },
    ],
    
  },
  {
    title: "Chat",
    to: "/student/chat",
    icon: <ChatIcon />,
    hasSubmenu: false,
    subMenu: null,
  },
    {
    title: "Setting",
    to: "/student/student-setting",
    icon: <SettingIcon />,
    hasSubmenu: false,
    subMenu: null,
  },

];

