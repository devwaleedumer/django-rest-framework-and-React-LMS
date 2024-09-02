/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { Button } from "../../@/components/ui/button"
import { Checkbox } from "../../@/components/ui/checkbox"
import AssignModal from "./AssignGrade"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AssessmentSubmission = {
  obtained_marks: number
  student: any
  assessment: any
  isMarked:boolean,
  assessment_submission_url : string,
  submission_time: string,
  remarks: string,
  id: number
}

export const columns: ColumnDef<AssessmentSubmission>[] = [
   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
  ,
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, 
     cell({row}) {
       return  parseInt(row.id)+1
    }, 
  },
  {
    accessorKey: "full_name",
     header: "Title",
     cell({row}) {
            return row.original.student?.user.full_name
     },
  },
  {
     accessorKey: "total_marks",
     header: "Total Marks",
    cell({row}) {
        return row.original.assessment.total_marks
    },
  },
  
  {
     accessorKey: "assessment_submission_url",
     header: "Submission",
    cell({row}) {
        return <a  href={row.original.assessment_submission_url} target="_blank">
           View
        </a>
    },
  },
  {
    accessorKey: "obtained_marks",
     header: "Obtained Marks",
     cell({row}) {
         return row.original.isMarked ? 
          row.original.obtained_marks : <div className="p-1 bg-red-200 w-16  text-red-500 rounded-md text-[10px] text-center">Not graded</div>
     },
  },
  {
    id: "actions",
    cell: ({ row }) => {
    //   const course = row.original
        
      return (
        <AssignModal course={row.original}/>
      )
    },
  },
  
]
