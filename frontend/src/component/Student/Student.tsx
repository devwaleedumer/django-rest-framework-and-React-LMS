import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import {  studentListBreadcrumb } from "../../utils/Data/breadcrumb";
import { columns } from "./column";
import { StudentDataTable } from "./studentTable";
import { useParams } from "react-router-dom";
import { useGetStudentsByCourseQuery } from "../../redux/features/user/userApi";

const Student = () => {
    const {courseId} = useParams()
    const {data} = useGetStudentsByCourseQuery(courseId)

 columns
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={studentListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">Enrolled Students</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <StudentDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Student;
