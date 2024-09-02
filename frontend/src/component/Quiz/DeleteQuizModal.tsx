import React, { FC, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "../../@/components/ui/button";
import { useDeleteQuizMutation } from "../../redux/features/Assessments/Quiz/quizApi";

type Props = { id: number };

const DeleteQuizModal: FC<Props> = ({ id }) => {
    const [deleteQuiz, {error, isLoading, isSuccess}] =  useDeleteQuizMutation()
    const handleDelete = async () => {
    await deleteQuiz(id);
  };  
    useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: `Course has been deleted successfully with ${id}`,
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
    <AlertDialog>
      <AlertDialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:bg-primary-foreground">Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Do you want to Delete Quiz`` ?
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Quiz and remove related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  asChild >
            <Button onClick={handleDelete} disabled={isLoading} >
                Yes, Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuizModal;
