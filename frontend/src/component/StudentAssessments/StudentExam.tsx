import React from 'react'
import StudentAssessment from './StudentAssessment'
import { useGetAllAssessmentsByAssessmentTypeQuery } from '../../redux/features/Assessments/AssessmentApi'


const StudentExam = () => {
  const {data} = useGetAllAssessmentsByAssessmentTypeQuery(2)
  return (
    <StudentAssessment assessmentType='Quizzes' assessmentData={data|| []} />
  )
}

export default StudentExam