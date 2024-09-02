import { useEffect, useState } from 'react'
import { Outlet, } from 'react-router-dom'
import { cn } from '../../@/lib/utils'
import StudentAnnouncement from '../../component/Announcement/StudentAnnouncement'
import StudentHeader from './StudentHeader'
import StudentSidebar from './StudentSidebar'
import { useGetAllAnnouncementQuery } from '../../redux/features/Assessments/AssessmentApi'

const StudentLayout = () => {
    const [ShowSideBar, setShowSideBar] = useState<boolean>(false)
    const [showAnnouncement,setShowAnnouncement] = useState<boolean>(true)
    const {data: announcements,isLoading} = useGetAllAnnouncementQuery(null)
   if(isLoading){
    return
   }
     return ( 
       
        <div className="">
            <div className='overflow-hidden'>
                {
                    ( announcements && showAnnouncement)   ?            <StudentAnnouncement setOpen={setShowAnnouncement} open={showAnnouncement} announcements={ announcements[0]}/>
                    :             <StudentHeader showSidebar={ShowSideBar} setShowSidebar={setShowSideBar} />


                }
            <div className={cn(`flex  translate-x-64 lg:transform-none overflow-hidden `, ShowSideBar === true ? ' transform-none ' : '',showAnnouncement &&  announcements ? "pt-24" : 'pt-16')}>
                <StudentSidebar  />
            </div>
            <div className={cn(ShowSideBar && 'fixed inset-0 z-10 w-full h-full  bg-gray-900/50')} onClick={() => {setShowSideBar(false)}}></div>
            <div id='main-content' className="relative w-full h-full overflow-y-auto lg:ml-64">
                <main >
                   <Outlet/>   
                </main>
            </div>
        </div>
        </div>
    )
}

export default StudentLayout