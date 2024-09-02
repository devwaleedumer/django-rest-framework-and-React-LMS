import React, { useEffect } from 'react'
import StudentAssessment from './StudentAssessment'
import { useGetAllAssessmentsByAssessmentTypeQuery } from '../../redux/features/Assessments/AssessmentApi'
import MainContentLoader from '../Loader/MainContentLoader'


const StudentAssignment = () => {
  const {data,isLoading} = useGetAllAssessmentsByAssessmentTypeQuery(1)
  return (
    isLoading ? <MainContentLoader/> : 
    <StudentAssessment assessmentType='Assignments' assessmentData={data|| []} />
   )
}

export default StudentAssignment