import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import { assignmentListBreadcrumb } from "../../utils/Data/breadcrumb";
import { AssignmentDataTable } from "./assignmentTable";
import { useGetAllAssignmentQuery } from "../../redux/features/Assessments/Assignments/assignmentApi";
import { columns } from "./column";
import { useAppSelector } from "../../redux/hooks";

const Assignment = () => {
  const teacherId = useAppSelector((state) => state.user.user.teacherId)
 const {data} =  useGetAllAssignmentQuery(teacherId, {
        refetchOnMountOrArgChange: true,
    
 })

 columns
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={assignmentListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All Assignments</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <AssignmentDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
