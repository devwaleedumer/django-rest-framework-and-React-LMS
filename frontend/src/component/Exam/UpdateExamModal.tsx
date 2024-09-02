/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { z } from "zod";
import { MAX_FILE_SIZE } from "../../utils/options/imageConfiguration";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import {
  useGetAllCoursesQuery,
} from "../../redux/features/course/courseApi";
import { toast } from "sonner";
import { ACCEPTED_File_TYPES } from "../../utils/options/fileConfiguration";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
import { Exam } from "./column";
import { useUpdateExamMutation } from "../../redux/features/Assessments/Exam/examApi";

type Props = { exam:Exam};

const formSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(6, "Title must contain minimum 6 character(s)"),
  detail: z.string().min(8, "Detail  must contain minimum 8 character(s)"),
  assessment_material_url: z
    .instanceof(File, { message: "" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max File size is 4MB.`)
    .refine(
      (file) => ACCEPTED_File_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .docx, .pdf, .rar, and .webp formats are supported."
    )
    .optional()
    .or(z.null()),
  total_marks: z.coerce.number({ message: "marks is required" }),
  course: z.string({ message: "Course  is required" }),
  to_time: z
    .string({ message: "Due till is required" })
    .refine((time) => !moment(time).utc().isBefore(Date.now()), {
      message: "Date before today is invalid",
    }),
  id: z.number(),
});

const UpdateExamModal: FC<Props> = ({ exam }) => {
  const teacherId = useAppSelector((state) => state.user.user.teacherId);
  const { data: courseData } = useGetAllCoursesQuery(teacherId);
  const [updateExam, { isLoading, error, isSuccess }] =
    useUpdateExamMutation();
  const closeRef = useRef<HTMLElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: exam?.title,
      detail: exam?.detail,
      assessment_material_url: null,
      to_time: moment(exam?.to_time).format("YYYY-MM-DDTHH:mm"),
      course: exam.course.toString(),
      total_marks: exam.total_marks,
      id: exam?.id,
    },
  });

  async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    form.reset();
    await updateExam(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: `Course  updated successfully `,
      });
      closeRef.current.click();
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
            value.map((er, index) => `'${key}' ${er} \r\n`)
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
    <Dialog>
      <DialogTrigger   className=" relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:bg-primary-foreground">
        Update
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data) => await onSubmitAsync(data)
            )}
          >
            <DialogHeader>
              <DialogTitle>Update Exam</DialogTitle>
              <DialogDescription>Update Exam details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" type="text" {...field} />
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
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseData?.map((data, index) => (
                          <SelectItem
                            key={data?.title + index + data?.id}
                            value={data?.id.toString()}
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
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Details here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total_marks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marks</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Marks" type="text" {...field} />
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
                    <Input
                      placeholder="Enter Marks"
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assessment_material_url"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Change Assessment File</FormLabel>
                  {/* <FormDescription>
                    SVG, PNG, JPG, DOC, PDF, XLX, WORD or GIF 
                      </FormDescription> */}
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

            <div>
                <FormLabel>Current Assessment</FormLabel>
              <FormDescription>
               {exam.assessment_material_url.split("/assessment/")[1]}
              </FormDescription>
            </div>
            <DialogClose ref={closeRef} />
            <Button className="mt-2" type="submit">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExamModal;
