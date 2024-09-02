import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import  { FC } from 'react'
import * as React from "react"
import { cn } from '../../@/lib/utils'

type StateCardProps = {
    title: string,
    total :number,
    change: number
}
export const StatCard: FC<StateCardProps> = ({title,total,change}) => {
    
  return (
    <div className='w-full px-4 py-3 bg-white flex flex-col font-roboto font-medium  justify-between rounded gap-2'>
     <h5 className=' text-base text-gray-700'>{title}</h5>
    <h1 className=' text-4xl  text-gray-700'>{total} </h1>
     {change > 0 ?  <p className='items-center text-sm text-gray-300 font-normal  w-full flex'><span className=' text-green-500 mr-1'>+{change}%</span>Than last month <ArrowUpRight className='ml-auto text-green-500' /> </p>:<p className='flex items-center text-sm text-gray-300 font-normal w-full'><span className=' text-red-400 mr-1 '>{change}%</span>Than last month <ArrowDownLeft  className='ml-auto text-red-400 ' /> </p>}
    </div>
  )
}


export const StatCardList = React.forwardRef<HTMLDivElement,React.ComponentPropsWithoutRef<"div">>(({className,...props},ref) => (<div className={cn(className,' grid sm:grid-cols-3  grid-cols-1 gap-4 mt-4 lg:w-[calc(100%_-_256px)]')} {...props} ref={ref}/>))
