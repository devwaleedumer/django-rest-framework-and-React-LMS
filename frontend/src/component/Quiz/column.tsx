/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreVertical } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { Button } from "../../@/components/ui/button"
import { Checkbox } from "../../@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem , DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import moment from 'moment'
import UpdateQuizModal from "./UpdateQuizModal"
import DeleteQuizModal from "./DeleteQuizModal"
import { Link } from "react-router-dom"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Quiz = {
  id: number
  title: string
  course: number
  total_marks:number,
  num_submissions : number,
  add_time: string
  to_time: string
  assessment_material_url: string,
  course_name: string,
  category_name: string,
  detail: string
}

export const columns: ColumnDef<Quiz>[] = [
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
  ,{
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
    accessorKey: "title",
     header: "Title"
  },
   {
    accessorKey: "category_name",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
     accessorKey: "course",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell({row}) {
        return row.original.course_name
    },
  },
   {
    accessorKey: "total_marks",
     header: "Marks"
  },
  
  {
    accessorKey: "submission_no",
     header: "Submissions"
  },
   {
    accessorKey: "add_time",
     header: "Assigned at",
     cell({row}) {
         return   moment(row.original.add_time).format('DD/MM/YY HH:mm')
     },
  },
   {
    accessorKey: "to_time",
     header: "Due till",
        cell({row}) {
         return   moment(row.original.to_time).format('DD/MM/YY HH:mm')
     },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
  <DropdownMenu  >
  <DropdownMenuTrigger>
    <span className="sr-only">open</span>
    <MoreVertical  className="w-4 h-4"/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem  asChild    ><UpdateQuizModal   quiz={row.original}/></DropdownMenuItem>
    <DropdownMenuItem asChild><DeleteQuizModal id={row.original.id}  /></DropdownMenuItem>
    <Link to={'/assessment-submissions/'+row.original.id}><DropdownMenuItem >Submissions</DropdownMenuItem></Link>
  </DropdownMenuContent>
</DropdownMenu>
      )
    },
  },
  
]
