import React, { FC } from 'react'
import moment from 'moment'
import { X } from 'lucide-react'

type Props = {
    open:boolean,
    setOpen(open:boolean):void,
    announcements: any
}


const StudentAnnouncement : FC<Props> = ({open,setOpen,announcements}) => {
  return (
    open  &&  announcements !==null  && moment(announcements?.to_date).isAfter(Date.now()) && announcements?.isFeatured &&
    <div  className=" fixed px-4 py-2 border min-w-full  z-[1000]  border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800" role="alert">
  <div className="flex items-center">
    <X className=' w-4 h-4 absolute right-1 cursor-pointer' onClick={() => setOpen(false)}/>
    <svg className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Announcement</h3>
  </div>
  <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
    {announcements?.description}
  </div>
 
</div>
  )
}

export default StudentAnnouncement