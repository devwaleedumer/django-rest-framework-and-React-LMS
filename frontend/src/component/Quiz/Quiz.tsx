import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import { quizListBreadcrumb } from "../../utils/Data/breadcrumb";
import { columns } from "./column";
import { useAppSelector } from "../../redux/hooks";
import { QuizDataTable } from "./quizTable";
import { useGetAllQuizQuery } from "../../redux/features/Assessments/Quiz/quizApi";

const Quizzes = () => {
  const teacherId = useAppSelector((state) => state.user.user.teacherId)
 const {data} =  useGetAllQuizQuery(teacherId, {
        refetchOnMountOrArgChange: true,
    
 })

 columns
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={quizListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All Quizzes</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <QuizDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
