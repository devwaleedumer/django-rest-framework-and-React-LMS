/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import AppBreadcrumb from '../AppBreadcrumb'
import HeaderTitle from '../HeaderTitle'
import { assessmentListBreadcrumb } from '../../utils/Data/breadcrumb'
import AssessmentCard, { StudentAssessmentCardList } from '../AssessmentListCard/AssessmentList'

type Props = {
  assessmentType: string,
  assessmentData : any
}


const StudentAssessment : FC<Props> = ({assessmentData,assessmentType}) => {
  return (
    <div>
      <div className="p-4 bg-gray-50 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          {/* Page Breadcrumb */}
          <AppBreadcrumb links={assessmentListBreadcrumb} />
        </div>
        {/*  Title */}
        <HeaderTitle className="mt-1 font-roboto">{assessmentType}</HeaderTitle>
        {/* State Card */}
        <StudentAssessmentCardList>
          {
            assessmentData?.map((data) => (<AssessmentCard data={data}  />))
          }
        </StudentAssessmentCardList>
      </div> 
    </div>
    </div>
  )
}

export default StudentAssessment