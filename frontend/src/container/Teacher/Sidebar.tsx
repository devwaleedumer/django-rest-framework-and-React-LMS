import { FC, } from 'react'
import SidebarMenuItem from '../../component/Sidebar/SidebarMenuItem'
import SidebarWithSubMenuItem from '../../component/Sidebar/SidebarWithSubMenuItem'
import { sidebarMenuData } from '../../utils/types/Sidebar.types'
import { useLocation } from 'react-router-dom'
type SideBarProps = { as?: string }

const Sidebar: FC<SideBarProps> = () => {
  const {pathname}  = useLocation() 

    return (
        // start
       <aside className='fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-roboto duration-75 transition-[width]' aria-label="Sidebar">
            <div className="relative flex flex-col flex-1 bg-white border-r  divide-gray-200 ">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
                       {/* Sidebar list */}
                        <ul className="pb-2 space-y-2">
                         {/* Mobile search */}
                         <li>
                            <form  className="lg:hidden">
                            <label htmlFor="mobile-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5" placeholder="Search"/>
                            </div>
                            </form>
                          </li>
                      
                        {
                          sidebarMenuData
                                          .map(({title,subMenu,hasSubmenu, icon,to},index) => {

                            return  <li key={title+index}>
                                {
                                    !hasSubmenu ? <SidebarMenuItem title={title} icon={icon}  to={to} isActive={pathname.includes(title)}/> 
                                    :
                                    <SidebarWithSubMenuItem title={title} icon={icon} subMenus={subMenu} />
                                }
                            </li>
                          })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar