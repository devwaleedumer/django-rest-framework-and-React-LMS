import AppBreadcrumb from "../AppBreadcrumb";
import HeaderTitle from "../HeaderTitle";
import { courseListBreadcrumb } from "../../utils/Data/breadcrumb";
import { columns } from "./column";
import { AssessmentSubmissionDataTable } from "./assessmentSubmissionTable";
import { useGetAllSubmittedAssessmentQuery } from "../../redux/features/Assessments/AssessmentApi";
import { useParams } from "react-router-dom";


const AssessmentSubmission = () => {

 const {assessmentId} = useParams()
 const {data} =  useGetAllSubmittedAssessmentQuery(assessmentId, {
        refetchOnMountOrArgChange: true,
 })
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={courseListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All Submissions</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <AssessmentSubmissionDataTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentSubmission;
