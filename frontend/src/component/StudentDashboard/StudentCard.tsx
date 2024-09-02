import React, { FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card'
import { cn } from '../../@/lib/utils'
import { Button } from '../../@/components/ui/button'

type Props = {
    title: string,
    description: string,
    id: number,
    category: any,
    teacher: any

}

export const StudentCard : FC<Props> = ({teacher,title,description,id,category}) => {
  return (
    <Card >
              <div className="flex justify-between ">
                  <CardHeader>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
               
              </div>
                <CardFooter className=' flex gap-y-2 justify-between'>
                  <div className=""><h5 className=' font-medium text-base text-primary'>Class:{" "} <span className=' font-normal'>{category}</span></h5></div>
                  <div className=""><h5 className=' font-medium text-base text-primary'>Teacher:{" "} <span className=' font-normal tracking-tighter'>{teacher}</span></h5></div>
                </CardFooter>
            </Card>
  )
}

export const StudentCardList = React.forwardRef<HTMLDivElement,React.ComponentPropsWithoutRef<"div">>(({className,...props},ref) => (<div className={cn(className,' grid   grid-cols-1 gap-4 mt-4 lg:w-[calc(100%_-_256px)]')} {...props} ref={ref}/>))
