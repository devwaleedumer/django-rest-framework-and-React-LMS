/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactHTMLElement, useEffect, useRef } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../@/components/ui/dialog"
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input"
import { z } from "zod"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../utils/options/imageConfiguration"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../@/components/ui/form"
import { Textarea } from "../../@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../@/components/ui/select"
import { useCreateCourseMutation, useGetAllClassesQuery, useGetCourseByIdQuery, useGetTeacherByUserQuery, useUpdateCourseMutation } from "../../redux/features/course/courseApi"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { AssessmentSubmission } from "./column"
import { useGetSubmittedAssessmentByIdQuery, useUpdateSubmitAssessmentMutation } from "../../redux/features/Assessments/AssessmentApi"
import { useAppSelector } from "../../redux/hooks"
type Props = {course : AssessmentSubmission}

const formSchema = z.object({
   obtained_marks: z.coerce.number().optional().or(z.string()),
   remarks: z.string({message:  "Remarks is Required"}),
   id: z.coerce.number().optional().or(z.string()),
   isMarked : z.coerce.boolean(),
   isSubmitted : z.coerce.boolean(),
   
});

const AssignModal :FC<Props> = ({course}) => {



       const [updateAssessment,{isLoading,error,isSuccess}] = useUpdateSubmitAssessmentMutation()
      const closeRef = useRef<HTMLElement>(null)
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      obtained_marks: course.obtained_marks || '',
      remarks: course.remarks,
      id: course.id,
      isMarked: true,
      isSubmitted: true
    },
  });

 
    async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    form.reset();
   await  updateAssessment(values)
  }

   useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: `Assignment Marked Successfully   successfully `
      })
      closeRef.current.click()
    }
    if (error) {
      
      if ("data" in error) {
        if('detail' in  error.data ){
             toast.error(
          ` Error!`,
          {
            description: `${error.data.detail}`
          })
          return
        }
        const errorData = error as any;
        toast.error(
          ` Error, occurred!`,
          {
            description: Object.entries(errorData?.data).map(([key,value]) => (value.map((er,index) => `'${key}' ${er} \r\n`)))
          })
      }
      else {
        toast.error(
          ` Error`,
          {
            description: "Some thing went wrong, please try again ",
          })
      }
    }
  }, [error, isSuccess])


  return (
     <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Assign Grade</Button>
      </DialogTrigger>
             <DialogContent className="sm:max-w-[550px]">
      
         <Form {...form}  >
     <form onSubmit={form.handleSubmit(  async (data) => await onSubmitAsync(data))}>
        <DialogHeader>
          <DialogTitle>Assign Grade</DialogTitle>
          <DialogDescription>
            Assign grade to assessment    
              </DialogDescription>
        </DialogHeader>
         <FormField
                  control={form.control}
                  name="obtained_marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Obtained Marks</FormLabel>
                      <FormControl>
                        <Input placeholder="Obtained Marks" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                    <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Remarks  here"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />            <DialogClose ref={closeRef}/>
          <Button className="mt-2"  type="submit" >Update</Button>
     </form>
        </Form>
      </DialogContent>

    </Dialog>
  )
}

export default AssignModal

