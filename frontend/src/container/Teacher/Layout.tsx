import  {  useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { cn } from '../../@/lib/utils'
import { Outlet,  } from 'react-router-dom'


const Layout = () => {
    const [ShowSideBar, setShowSideBar] = useState<boolean>(false)
     return ( 
        <div className='overflow-hidden'>
            <Header showSidebar={ShowSideBar} setShowSidebar={setShowSideBar} />
            <div className={cn(`flex  pt-16  translate-x-64 lg:transform-none overflow-hidden `, ShowSideBar === true ? ' transform-none ' : '')}>
                <Sidebar  />
            </div>
            <div className={cn(ShowSideBar && 'fixed inset-0 z-10 w-full h-full  bg-gray-900/50')} onClick={() => {setShowSideBar(false)}}></div>
            <div id='main-content' className="relative w-full h-full overflow-y-auto lg:ml-64">
                <main >
                   <Outlet/>   
                </main>
            </div>
        </div>
    )
}

export default Layout