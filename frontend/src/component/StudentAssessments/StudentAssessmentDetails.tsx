/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import AppBreadcrumb from '../AppBreadcrumb'
import HeaderTitle from '../HeaderTitle'
import { assessmentListBreadcrumb } from '../../utils/Data/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../@/components/ui/card'
import { useParams } from 'react-router-dom'
import { useGetAssessmentByIdQuery, useGetSubmittedAssessmentByIdQuery, useSubmitAssessmentMutation } from '../../redux/features/Assessments/AssessmentApi'
import {  Notebook, PenBox, Plus, Verified, XCircleIcon } from 'lucide-react'
import moment from 'moment'
import { Button } from '../../@/components/ui/button'
import { useAppSelector } from '../../redux/hooks'
import { toast } from 'sonner'



const StudentAssessmentDetails  = () => {
  const {assessmentId} = useParams()
  const user = useAppSelector((state) => state.user.user)
  const {data:assessmentData} = useGetAssessmentByIdQuery(assessmentId)
  const {data:submittedAssessmentData} = useGetSubmittedAssessmentByIdQuery({assessmentId:assessmentId,studentId:user.studentId})
  const [submitAssessment, {isLoading,error,isSuccess}] = useSubmitAssessmentMutation()
  const [file, setFile] = useState<File>(null)
  const handleFileChange = (file: any) => {
      setFile(file)
  }
  const handleSubmitAssessment = async () => {
        if(file == null) {
           toast.error("validation error", {
        description:`please upload file to submit `,
      });
      return
        }
        const _formData = new FormData()
        _formData.append('assessment', assessmentId);
        _formData.append('isSubmitted', true);
        _formData.append('student', user.studentId);
        _formData.append('teacher', assessmentData.teacher);
        _formData.append('course', assessmentData.course);
        _formData.append('assessment_submission_url',file)
        await submitAssessment(_formData)
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description:`Assessment submitted successfully`,
      });
    }
    if (error) {
      if ("data" in error) {
        if ("detail" in error.data) {
          toast.error(` Error!`, {
            description: `${error.data.detail}`,
          });
          return;
        }
        const errorData = error as any;
        toast.error(` Error, occurred!`, {
          description: Object.entries(errorData?.data).map(([key, value]) =>
            value?.map((er, index) => `'${key}' ${er} \r\n`)
          ),
        });
      } else {
        toast.error(` Error`, {
          description: "Some thing went wrong, please try again ",
        });
      }
    }
  }, [error, isSuccess]);

  return (
    <div>
      <div className="p-4 bg-gray-50 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          {/* Page Breadcrumb */}
          <AppBreadcrumb links={assessmentListBreadcrumb} />
        </div>
        {/*  Title */}
        <HeaderTitle className="mt-1 font-roboto">Assessment Details</HeaderTitle>
        {/* State Card */}
        <section className='mt-4 lg:w-[calc(100%_-_256px)]'>
        <div className=" w-full flex gap-4  sm:flex-row flex-col-reverse">
            <Card className='sm:w-2/3 w-full'>
            <CardHeader>
             <div className="flex justify-between items-center">
        <CardHeader className="flex flex-row  items-center gap-x-2">
          <div className=" p-2 bg-gray-200 rounded-full">
            <Notebook className=" h-6 w-6   text-primary" />
          </div>
          <CardTitle className=" text-xl m-0 leading-none">
            
              
            {assessmentData?.title} 
            
            </CardTitle>
        
        </CardHeader>
        <CardContent className="p-6 flex flex-row gap-x-2"><Button variant='outline'>Due: {moment(assessmentData?.to_date).format('DD MMMM h:mm A')}</Button></CardContent>
      </div>
            </CardHeader>
            <CardContent className=' px-12'>
               <CardTitle className=' text-base flex items-center gap-x-1 '>
                Teacher: <CardDescription>
                  {assessmentData?.teacher_name}
                </CardDescription>
              </CardTitle>
               <CardTitle className='mb-2  text-base flex items-center gap-x-1 '>
                Course: <CardDescription>
                  {assessmentData?.course_name}
                </CardDescription>
              </CardTitle>
              <CardTitle className=' text-base'>
               Assessment details
              </CardTitle>
             
              <CardDescription>
                {assessmentData?.detail}
              </CardDescription>
              
              <a href={assessmentData?.assessment_material_url} target="_blank">
                 <Button  size='sm' variant='outline' className=' mt-6 flex'>Download Assessment File</Button>
              </a>
              
            {
              submittedAssessmentData?.isSubmitted ? 
                  <Button  size='sm' className='mt-2 pointer-events-none'> <Verified className='mr-2'  />    Submitted  </Button>
:
                  <Button  size='sm' className='mt-2 pointer-events-none'> <XCircleIcon className='mr-2'  />    Pending  </Button>

             } 

            </CardContent>
          </Card>
          <div className=" sm:w-1/3 w-full flex gap-y-4 flex-col"> 
              <Card>
                <CardHeader>
                  <div className='w-full truncate p-2 rounded border text-center text-base'>{file?.name || submittedAssessmentData?.assessment_submission_url.split('/assessment_submission/')[1]   || 'No file added '}   </div>
                  {
                    !submittedAssessmentData?.assessment_submission_url ?

                   <div className=" flex flex-col gap-y-2">
                     <label htmlFor='submission_file' className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
              <Plus className=' h-5 w-5 mr-2 font-bold'/>  Add Submission
                  </label>
                  <Button disabled = {isLoading}  className='' variant="outline" size='sm' onClick={async () => handleSubmitAssessment()} >
                    Turn in
                  </Button>
                   </div>
                  :
                  <Button>
                     Submission Added
                  </Button>
                  }
                  <input type='file' id='submission_file'  className='hidden'  name='assessment_submission_url' onChange={(e) => handleFileChange(e.target.files[0])}/>
                </CardHeader>
                
              </Card>
             {submittedAssessmentData?.assessment_submission_url && submittedAssessmentData?.isMarked &&
             
              <Card>
                <CardHeader>
                  <CardTitle className=' text-base flex items-center gap-x-2'>
                    <PenBox className=' text-primary h-4 w-4'/>   <span> Grades and Remarks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <CardTitle className='mb-2  text-base flex items-center gap-x-1 '>
                Marks: <CardDescription>
                  {submittedAssessmentData?.obtained_marks}/{assessmentData?.total_marks}
                </CardDescription>
              </CardTitle>
                   <CardTitle className='mb-2  text-base flex items-center gap-x-1 '>
                Remarks: <CardDescription>
                {submittedAssessmentData?.remarks}
                </CardDescription>
              </CardTitle>
                </CardContent>
              </Card>
             
             }
          </div>
        </div>
        </section>
      </div> 
    </div>
    </div>
  )
}

export default StudentAssessmentDetails