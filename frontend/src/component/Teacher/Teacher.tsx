import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import {  teacherListBreadcrumb } from "../../utils/Data/breadcrumb";
import { columns } from "./column";
import { TeacherDataTable } from "./teacherDataTable";
import { useGetTeacherByStudentQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";

const Student = () => {
    const studentId = useAppSelector((state) => state.user.user.studentId )
    const {data} = useGetTeacherByStudentQuery(studentId)

 columns
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={teacherListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">Teachers</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <TeacherDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Student;
