/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import { Button } from "../../@/components/ui/button";
import { useDeleteCourseMutation } from "../../redux/features/course/courseApi";
import { toast } from "sonner";

type Props = {
  courseId: number;
};

const DeleteCourseModal: FC<Props> = ({ courseId }) => {
  const [deleteCourse, { isLoading, error, isSuccess }] =
    useDeleteCourseMutation();
  const handleDelete = async () => {
    await deleteCourse(courseId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: `Course has been deleted successfully with ${courseId}`,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        if ("detail" in errorData) {
          toast.error(` Error!`, {
            description: `${errorData.detail}`,
          });
          return;
        }
      }
      toast.error(` Error!`, {
        description: `some thing went wrong try again`,
      });
    }
  }, [isSuccess, error]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to delete this Course ?</DialogTitle>
          <DialogDescription>
            Click on delete button to confirm.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleDelete} disabled={isLoading}>
              Delete
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
       </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourseModal;
