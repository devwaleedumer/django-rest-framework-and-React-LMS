import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../@/components/ui/dialog"
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"

type Props = {}

const AddUserModal :FC<Props> = ({}) => {
  return (
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add user details        
              </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1  gap-y-2">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue="MERN, MEAN"
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
           <textarea name="description" id="description" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"></textarea>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}

export default AddUserModal