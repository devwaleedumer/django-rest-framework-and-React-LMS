import React, { FC } from "react";
import { cn } from "../../@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Notebook } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  data: any

};
const AssessmentCard: FC<Props> = ({ data}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <CardHeader className="flex flex-row  items-center  gap-x-2">
          <div className=" p-2 bg-gray-200 rounded-full">
            <Notebook className=" h-5 w-5   text-primary" />
          </div>
          <CardTitle className=" text-xl ">{data.title} <span className=" capitalize font-semibold text-base">({data.course_name})</span></CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-row gap-x-2"><CardDescription><span className=" text-primary font-bold  tracking-tight">Due Till:</span>  {moment(data.to_date).format('DD/MM/YY hh:mm')}</CardDescription></CardContent>
      </div>
      <CardFooter className=" flex flex-row justify-between">
        <Link to={'/student/student-assessment-detail/'+data.id}>
        <Button size="sm" variant="outline">
            View
        </Button>
        </Link>
        <Button size="sm" className=" pointer-events-none">
           {data.is_assessment_submitted == true  ? "Submitted" : "Pending"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;

export const StudentAssessmentCardList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      className,
      " grid   grid-cols-1 gap-4 mt-4 lg:w-[calc(100%_-_256px)]"
    )}
    {...props}
    ref={ref}
  />
));
