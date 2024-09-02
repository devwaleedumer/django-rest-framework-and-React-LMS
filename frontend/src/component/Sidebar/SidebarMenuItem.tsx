import React, { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../@/lib/utils'

type SidebarMenuItemProps = {
    icon: ReactNode,
    to: string,
    title: string,
    isActive: boolean,
}

const SidebarMenuItem :FC<SidebarMenuItemProps> = ({icon,to,title, isActive, }) => {
  return (
     <Link
      to={to}
      className={cn(`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group`,isActive && 'bg-gray-100')} >
     {icon}
      <span className="ml-3">{title}</span>
    </Link>
  )
}

export default SidebarMenuItem