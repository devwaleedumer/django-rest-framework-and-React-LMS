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
import { Course } from "./column"
type Props = {course : Course}

const formSchema = z.object({
   title: z.string({message: 'title is required'}).min(6, "title must contain minimum 6 character(s)"),
    description: z.string().min(8, "description must contain minimum 8 character(s)"),
    featured_img: z
      .instanceof(File,{message: ''})
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ).optional().or(z.null()),
      id : z.number(),
  category: z.string({ message: "category is required" }),

});


const UpdateCourseModal :FC<Props> = ({course}) => {
      const {data: classData} = useGetAllClassesQuery(null)
       const [updateCourse,{isLoading,error,isSuccess}] = useUpdateCourseMutation()
      const closeRef = useRef<HTMLElement>(null)
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title,
      description: course?.description,
     featured_img:  null,
      id: course?.id,
      category: course?.category.id.toString() ,
    },
  });

 
    async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    form.reset();
   await  updateCourse(values)
  }

   useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: `Course  updated successfully `
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
        <Button size="sm" variant="outline">Update</Button>
      </DialogTrigger>
             <DialogContent className="sm:max-w-[550px]">
      
         <Form {...form}  >
     <form onSubmit={form.handleSubmit(  async (data) => await onSubmitAsync(data))}>
        <DialogHeader>
          <DialogTitle>Update Course</DialogTitle>
          <DialogDescription>
            Update Course details        
              </DialogDescription>
        </DialogHeader>
         <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="course title" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                    <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description here"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field?.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classData?.map((data,index) => (<SelectItem key={data?.title+index+data?.id}  value={data?.id.toString()}>{data?.title}</SelectItem>))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
                  control={form.control}
                  name="featured_img"
                  render={({ field : {onChange, value, ...fieldProps}}) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormDescription>
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </FormDescription>
                      <FormControl>
                        <Input type="file"  {...fieldProps}    onChange={(e)=> {onChange(e.target.files[0])}} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>
                    Previous Image
                  </FormLabel>
                  <img src={course.featured_img} loading="lazy" alt="Course Image" className="rounded-sm max-h-20 w-full" />
                </div>
                <DialogClose ref={closeRef}/>
          <Button className="mt-2"  type="submit" >Update</Button>
     </form>
        </Form>
      </DialogContent>

    </Dialog>
  )
}

export default UpdateCourseModal

