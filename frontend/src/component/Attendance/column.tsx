// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, CalendarCheck, CalendarPlus, CalendarPlus2, PenBox  } from "lucide-react"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
// import { Button } from "../../@/components/ui/button"
// import { Checkbox } from "../../@/components/ui/checkbox"
// import { Avatar, AvatarFallback, AvatarImage } from "../../@/components/ui/avatar"
// import { serverBaseURL } from "../../utils/options/server"
// import { useAttendanceCreateMutation } from "../../redux/features/course/courseApi"
// import { useAppSelector } from "../../redux/hooks"
// import { useParams } from "react-router-dom"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Student = {
//   id: number
//   user: any
//   is_present: boolean,

// }

// export const columns: ColumnDef<Student>[] = [
//    {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   }
//   ,
//   {
//     accessorKey: "id",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Id
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
      
//     },
//    cell({row}) {
//        return  parseInt(row.id)+1
//     },
//   },
//    {
//     accessorKey: 'profile_picture',
//     header: 'Profile',
//     cell({row}) {
//       return (
//            <Avatar>
//                     <AvatarImage
//                       className="rounded-full w-11 h-11"
//                       src={ serverBaseURL+`${row?.original?.user?.profile_picture}`}
//                     />
//                     <AvatarFallback>C</AvatarFallback>
//                   </Avatar>

//       )  
//     }}
//     ,
//   {
//     accessorKey: "full_name",
//      header: "Name",
//      cell({row}) {
//         return row.original.user.full_name
         
//      },
//   },
//    {
//     accessorKey: "email",
//    header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell({row}) {
//          return row.original.user?.email
//     },
//   },
 
   
//   {
//     id: "actions",
//     cell: ({ row,cell }) => {
        
        
//         const [markAttendance,{isLoading}] = useAttendanceCreateMutation()
//         const handleMarkAttendance = async () => {
//             // const teacherId = useAppSelector((state) => state.user.user.teacherId)
//             const {courseId} = useParams()
//             const _formData = new FormData()
//             _formData.append("student",row.original.id.toString() )
//             _formData.append("course_id",courseId )
//             // _formData.append('marked_by_teacher',teacherId)

//           await  markAttendance(_formData)
//         }

//       return (
//            row.original.is_present ? <Button size="sm">
//         <CalendarPlus2 className="mr-2 h-4 pointer-events-none"/> Marked
//            </Button>
//            :
//            <Button onClick={async () => await handleMarkAttendance()} disabled={isLoading}  size="sm" variant='outline'>
//              <CalendarCheck className="mr-2 h-4"/>    Mark
//            </Button>
//       )
//     },
//   },
  
// ]
