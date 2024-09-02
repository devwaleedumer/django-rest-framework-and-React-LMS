import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import { courseListBreadcrumb } from "../../utils/Data/breadcrumb";
import { columns } from "./column";
import { CourseDataTable } from "./CourseTable";
import { useGetAllCoursesQuery } from "../../redux/features/course/courseApi";
import { useAppSelector } from "../../redux/hooks";


const Course = () => {
  
  const teacherId = useAppSelector((state) => state.user.user.teacherId)

 const {data} =  useGetAllCoursesQuery(teacherId, {
        refetchOnMountOrArgChange: true,
 })
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={courseListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All Courses</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <CourseDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Course;
