import React from 'react'
import StudentAssessment from './StudentAssessment'
import { useGetAllAssessmentsByAssessmentTypeQuery } from '../../redux/features/Assessments/AssessmentApi'


const StudentQuiz = () => {
  const {data} = useGetAllAssessmentsByAssessmentTypeQuery(2)
  return (
    <StudentAssessment assessmentType='Quizzes' assessmentData={data|| []} />
  )
}

export default StudentQuiz