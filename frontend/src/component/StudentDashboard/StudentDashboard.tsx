import { useEffect } from "react";
import { useGetAllCoursesStudentQuery } from "../../redux/features/course/courseApi";
import { useAppSelector } from "../../redux/hooks";
import { dashboardBreadcrumb } from "../../utils/Data/breadcrumb";
import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import  { StudentCard, StudentCardList } from "./StudentCard";

const Dashboard = () => {
  const user =  useAppSelector((state) => state.user.user)
  const {data: courseData} = useGetAllCoursesStudentQuery(user.studentId)
  useEffect(() => {
    console.log(courseData)
  })
  return (
    <div className="p-4 bg-gray-50 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          {/* Page Breadcrumb */}
          <AppBreadcrumb links={dashboardBreadcrumb} />
        </div>
        {/*  Title */}
        <HeaderTitle className="mt-1 font-roboto">Enrolled Courses</HeaderTitle>
        {/* State Card */}
        <StudentCardList>
          {
            courseData?.map((data) => (<StudentCard teacher={data?.teacher?.user?.full_name} category={data?.category?.title} title={data?.title}  description={data?.description} id={data?.id}/>))
          }
        </StudentCardList>
      </div>
    </div>
  );
};

export default Dashboard;
