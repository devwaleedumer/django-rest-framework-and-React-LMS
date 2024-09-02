import React, { FC, ReactNode, useState } from 'react'
import SubMenuItem from './SubMenuItem'
import { SubMenu } from '../../utils/types/Sidebar.types'
import { useLocation } from 'react-router-dom'
import { cn } from '../../@/lib/utils'
import { ChevronDown } from 'lucide-react'

type SidebarWithSubMenuItemProps = {
   title: string,
   icon: ReactNode,
   subMenus : SubMenu[],
}

const SidebarWithSubMenuItem : FC<SidebarWithSubMenuItemProps> = ({icon,title, subMenus}) => {
  const {pathname} = useLocation()
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  return (
    <>
    {/* Trigger button */}
     <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 " aria-controls={`dropdown-${title}`}  onClick={() =>{setShowSubMenu(!showSubMenu)}}>
              {/* Icon Svg */}
               {icon}
                <span className="flex-1 ml-3 text-left whitespace-nowrap" >{title}</span>
               {/* <ArrowDownIcon/> */}
               <ChevronDown className={cn(`h-6 w-6`, showSubMenu ? 'rotate-180 transition-transform duration-200 ease-in' : 'rotate-0 transition-transform duration-200 ease-out')}/>
            </button>
            <ul id="dropdown" className={cn(`space-y-2 transition-all  duration-200 ease-in-out`, showSubMenu === true ? '' : 'max-h-0  overflow-hidden ')}>
             {
              subMenus.map(({title: subTitle,to},index ) => <li key={index+title}><SubMenuItem title={subTitle} to={to}  isActive={pathname.includes(subTitle)}  /></li>)
             }
            </ul>
    </>
  )
}

export default SidebarWithSubMenuItem