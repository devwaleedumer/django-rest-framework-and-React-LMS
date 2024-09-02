import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import {  attendanceListBreadcrumb } from "../../utils/Data/breadcrumb";
import { useParams } from "react-router-dom";
import { AttendanceDataTable } from "./attendanceTable";
import { useGetAttendanceListQuery } from "../../redux/features/course/courseApi";
import { useAppSelector } from "../../redux/hooks";

const Attendance = () => {
    const {courseId} = useParams()
    const teacherId = useAppSelector((state) => state.user.user.teacherId)
    const {data} = useGetAttendanceListQuery({course: courseId,teacher: teacherId})
    console.log(data)

  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={attendanceListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">Attendance</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <AttendanceDataTable  data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
