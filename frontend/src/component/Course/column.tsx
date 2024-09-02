/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { Button } from "../../@/components/ui/button"
import { Checkbox } from "../../@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "../../@/components/ui/avatar"
import UpdateCourseModal from "./UpdateCourseModel"
import DeleteCourseModal from "./DeleteCourseModal"
import { Link } from "react-router-dom"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Course = {
  id: number
  featured_img: string
  title: string
  category:any,
  total_enrolled_students : number,
  description: string
}

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: 'featured_img',
    header: 'Course Image',
    cell({row}) {
      return (
           <Avatar>
                    <AvatarImage
                      className="rounded-full w-11 h-11"
                      src={ `${row?.original?.featured_img}`}
                    />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>

      )  
    },
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
     accessorKey: "category",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell({row}) {
        return row.original.category.title
    },
  },
  {
    accessorKey: "total_enrolled_students",
     header: "Total Students"
  },
  {
    id: "actions",
    cell: ({ row }) => {
    //   const course = row.original
        
      return (
        <div  className="flex space-x-2">
            <DeleteCourseModal courseId={row.original.id}/>
            <UpdateCourseModal course={row.original} />
            <Link to={`/student-list/${row.original.id}`}>
                        <Button variant="outline" size="sm">Students</Button>
            </Link>
        </div>
      )
    },
  },
  
]
