import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table"
import { Button } from "../../@/components/ui/button"
import React, { useEffect } from "react"
import { Input } from "../../@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../@/components/ui/dropdown-menu"
import { ArrowUpDown, CalendarCheck, CalendarPlus2, ChevronDown, } from "lucide-react"
import { Checkbox } from "../../@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "../../@/components/ui/avatar"
import { serverBaseURL } from "../../utils/options/server"
import { useAttendanceCreateMutation } from "../../redux/features/course/courseApi"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { toast } from "sonner"
import moment from "moment"
interface QuizDataTableProps<TData> {
  columns: ColumnDef<TData>[]
}

 type Student = {
  id: number
  user: any
  is_present: boolean,

}

export function AttendanceDataTable<TData>({
  data,
}: QuizDataTableProps<TData>) {
      const {courseId} = useParams()
      const teacherId = useAppSelector((state) => state.user.user.teacherId)


    const [markAttendance,{isLoading,error,isSuccess}] = useAttendanceCreateMutation()
        const handleMarkAttendance = async (row) => {
            const _formData = new FormData()
            _formData.append("student",row.original.id.toString() )
            _formData.append("course",courseId )
            _formData.append("is_marked",true )
            _formData.append('marked_by_teacher',teacherId)
            _formData.append('date',moment(Date.now()).format('YYYY-MM-DD'))

          await  markAttendance(_formData)
        }


        const columns: ColumnDef<Student>[] = [
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
                      src={ serverBaseURL+`${row?.original?.user?.profile_picture}`}
                    />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>

      )  
    }}
    ,
  {
    accessorKey: "full_name",
     header: "Name",
     cell({row}) {
        return row.original.user.full_name
         
     },
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
    cell({row}) {
         return row.original.user?.email
    },
  },
 
   
  {
    id: "actions",
    cell: ({ row }) => {
        
        
      

      return (
           row.original.is_present ? <Button size="sm">
             <CalendarCheck className="mr-2 h-4"/>
         Marked
           </Button>
           :
           <Button onClick={async () => await handleMarkAttendance(row)} disabled={isLoading}  size="sm" variant='outline'>
              <CalendarPlus2 className="mr-2 h-4 pointer-events-none"/>  Mark
           </Button>
      )
    },
  },
  
]


  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description:`Attendance Marked`,
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


 const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
 
  return (
    <div className="lg:w-[calc(100%_-_256px)]">
      <div className="flex items-center justify-between  py-4">
        <Input
          placeholder="Student name..."
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
       <div className="flex ml-2 ">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden sm:flex">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
       </div>
      </div>
      <div className="rounded-md border">
         <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody> 
              
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>)
}
