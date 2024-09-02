import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../@/lib/utils'

interface  SubMenuItemProps extends React.HTMLAttributes<HTMLElement> {
    isActive: boolean,
    to: string,
    title: string
}
const SubMenuItem:FC<SubMenuItemProps> = ({to,title,isActive, ...rest}) => {
  return (
    <Link  {...rest} to={ to } className={cn(`text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11`,isActive && 'bg-gray-100')} >{title}</Link>
  )
}

export default SubMenuItem