import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import { columns } from "./column";
import { useAppSelector } from "../../redux/hooks";
import { ExamDataTable } from "./examTable";
import { examListBreadcrumb } from "../../utils/Data/breadcrumb";
import { useGetAllExamQuery } from "../../redux/features/Assessments/Exam/examApi";

const Exam = () => {
  const teacherId = useAppSelector((state) => state.user.user.teacherId)
 const {data} =  useGetAllExamQuery(teacherId, {
        refetchOnMountOrArgChange: true,
    
 })

 columns
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={examListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All Project</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <ExamDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Exam;
