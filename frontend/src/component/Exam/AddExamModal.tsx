/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { date, z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../utils/options/imageConfiguration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form";
import { Textarea } from "../../@/components/ui/textarea";
import {
  useGetAllCoursesQuery,
} from "../../redux/features/course/courseApi";
import { toast } from "sonner";
import { ACCEPTED_File_TYPES } from "../../utils/options/fileConfiguration";
import moment from "moment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../@/components/ui/select";
import { useAppSelector } from "../../redux/hooks";
import { useCreateExamMutation } from "../../redux/features/Assessments/Exam/examApi";

const formSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(6, "Title must contain minimum 6 character(s)"),
  detail: z
    .string()
    .min(8, "Detail  must contain minimum 8 character(s)"),
  assessment_material_url: z
    .instanceof(File, { message: "" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max File size is 4MB.`)
    .refine(
      (file) => ACCEPTED_File_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .docx, .pdf, .rar, and .webp formats are supported."
    ),
  assessment_type: z.number({message: "Assessment Type required"}).optional().or(z.string({message: "Assessment Type is required"})),
  teacher: z.number(),
  total_marks: z.coerce.number({ message: "marks is required" }),
  course: z.string({ message: "Course  is required" }),
  to_time: z.string({message: "Due till is required"}).refine((time) => !moment(time).utc().isBefore(Date.now()),{message: 'Date before today is invalid'} )
});

const AddExamModal = () => {
  
  const teacherId = useAppSelector((state) => state.user.user.teacherId)
  const {data: courseData} =  useGetAllCoursesQuery(teacherId, {
        refetchOnMountOrArgChange: true,
    
 })
  const [AddExam, { isLoading, error, data, isSuccess }] =
    useCreateExamMutation();

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      detail: "",
      assessment_material_url: null,
      assessment_type: '',
      to_time: "",
      course: "",
      teacher: teacherId as number,
      total_marks: 0

    },
  });
  async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    await AddExam(values);
    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description:`Exam ${data.title} created successfully`,
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
            value?.map((er, index) => `'${key}' ${er} \n`)
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
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmitAsync(data))} className="space-y-4 md:space-y-6">
            <DialogHeader>
              <DialogTitle>Add Project`</DialogTitle>
              <DialogDescription>Add Project details</DialogDescription>
            </DialogHeader>
           <div className=" grid grid-cols-2 sm:space-x-2 space-x-1">
             <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                onValueChange={field.onChange}   defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseData?.map((data, index) => (
                        <SelectItem
                          key={data?.title + data?.id}
                          value={`${data?.id}`}
                        >
                          {data?.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detail here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
        <div className=" grid grid-cols-2 space-x-1 sm:space-x-2">
            <FormField
              control={form.control}
              name="total_marks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marks</FormLabel>
                  <FormControl>
                  <Input {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="to_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Till</FormLabel>
                  <FormControl>
                  <Input {...field} type="datetime-local"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
                     <div className="grid grid-cols-2 gap-x-2">
                       <FormField
              control={form.control}
              name="assessment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                onValueChange={field.onChange}   defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Project Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem
                          value={`3`}
                        >
                          First  Term Project
                        </SelectItem>
                        <SelectItem
                          value={`4`}
                        >
                        Mid Term Project
                        </SelectItem>
                        <SelectItem
                          value={`5`}
                          >
                          Final Term Project
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assessment_material_url"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Assessment File</FormLabel>
                 
                  <FormControl>
                    <Input
                      type="file"
                      {...fieldProps}
                      onChange={(e) => {
                        onChange(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                     </div>
            <DialogFooter>
            <Button type="submit" disabled={isLoading}>Create</Button>
            </DialogFooter>
        </form>
      </Form>
          </DialogContent>
    </Dialog>
  );
};

export default AddExamModal;
