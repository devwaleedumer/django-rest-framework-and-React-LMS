/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MessageCircle, MoreVertical } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { Button } from "../../@/components/ui/button"
import { Checkbox } from "../../@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem , DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../../@/components/ui/avatar"
import { Link } from "react-router-dom"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: number
  full_name: string
  profile_picture: string
  email:string,
  studentId:number
}

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: 'profile_picture',
    header: 'Profile',
    cell({row}) {
      return (
           <Avatar>
                    <AvatarImage
                      className="rounded-full w-11 h-11"
                      src={ `${row?.original?.profile_picture}`}
                    />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>

      )  
    }}
    ,
  {
    accessorKey: "full_name",
     header: "Name"
  },
   {
    accessorKey: "email",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
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
        <Link to={'/teacher-chat/'+row.original.studentId}><DropdownMenuItem ><MessageCircle className="h-4 w-4 mr-2" />  Chat</DropdownMenuItem></Link>
  </DropdownMenuContent>
</DropdownMenu>
      )
    },
  },
  
]
