/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect, FC, RefAttributes } from "react";
import * as React from "react"
import { Link } from "react-router-dom"
import Transition from "../../utils/Transition";
import { cn } from "../../@/lib/utils";
import { Slot } from "@radix-ui/react-slot";




type DropdownMenuProps = {
    className?: string,
    position?: 'left' | 'right'
    children: React.ReactNode
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ className, position, children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });
    return (
        <>
            <Transition
                className={cn(`origin-top-right absolute  z-10 top-full  mt-1 ${className}`, position === 'left' ? "left-0" : "right-0")}
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                appear={''}
            >
                {children}
            </Transition>
        </>
    )
}


interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    trigger: RefAttributes<HTMLButtonElement>,
    setDropdownOpen(dropdownOpen: boolean): void,
    dropdownOpen: boolean,
    icon: React.ReactNode,
    srText: string
}


export const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({ trigger, setDropdownOpen, dropdownOpen, srText, className, icon, ...rest }) => {
    return (
        <button ref={trigger.ref} {...rest} onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className={className}>
            <span className="sr-only">{srText}</span>
            {/* <!-- Bell icon --> */}
            {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg> */}
            {icon}
        </button>
    )
}



// interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLButtonElement> {
//     trigger: RefAttributes<HTMLButtonElement>,
//     setDropdownOpen?(dropdownOpen: boolean): void,
//     dropdownOpen?: boolean,
// }



// export const DropDownMenuContent: FC<DropdownMenuContentProps> = ({trigger,setDropdownOpen,dropdownOpen}) => {
//     return (
//         <div ref={trigger} className="z-50  max-w-sm overflow-hidden text-base bg-white divide-y divide-gray-100 rounded shadow-lg ">
//             <div className="block px-4 py-2 text-base font-medium text-center bg-gray-50 text-gray-700 ">
//                 Notifications
//             </div>
//             <div>
//                 <Link className='flex px-4 py-3 border-b hover:bg-gray-100' to={'#'}>
//                     <div className="flex-shrink-0">
//                         <Avatar>
//                             <AvatarImage className='rounded-full w-11 h-11' src="https://github.com/shadcn.png" />
//                             <AvatarFallback>WN</AvatarFallback>
//                         </Avatar>
//                         <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
//                         </div>
//                     </div>
//                     <div className="w-full pl-3">
//                         <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
//                         <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
//                     </div>
//                 </Link>
//                 <Link className='flex px-4 py-3 border-b hover:bg-gray-100' to={'#'}>
//                     <div className="flex-shrink-0">
//                         <Avatar>
//                             <AvatarImage className='rounded-full w-11 h-11' src="https://github.com/shadcn.png" />
//                             <AvatarFallback>WN</AvatarFallback>
//                         </Avatar>
//                         <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
//                         </div>
//                     </div>
//                     <div className="w-full pl-3">
//                         <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
//                         <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
//                     </div>
//                 </Link>
//                 <Link className='flex px-4 py-3 border-b hover:bg-gray-100' to={'#'}>
//                     <div className="flex-shrink-0">
//                         <Avatar>
//                             <AvatarImage className='rounded-full w-11 h-11' src="https://github.com/shadcn.png" />
//                             <AvatarFallback>WN</AvatarFallback>
//                         </Avatar>
//                         <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
//                         </div>
//                     </div>
//                     <div className="w-full pl-3">
//                         <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
//                         <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
//                     </div>
//                 </Link>
//                 <Link className='flex px-4 py-3 border-b hover:bg-gray-100' to={'#'}>
//                     <div className="flex-shrink-0">
//                         <Avatar>
//                             <AvatarImage className='rounded-full w-11 h-11' src="https://github.com/shadcn.png" />
//                             <AvatarFallback>WN</AvatarFallback>
//                         </Avatar>
//                         <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
//                         </div>
//                     </div>
//                     <div className="w-full pl-3">
//                         <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
//                         <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
//                     </div>
//                 </Link>
//                 <Link className='flex px-4 py-3 border-b hover:bg-gray-100' to={'#'}>
//                     <div className="flex-shrink-0">
//                         <Avatar>
//                             <AvatarImage className='rounded-full w-11 h-11' src="https://github.com/shadcn.png" />
//                             <AvatarFallback>WN</AvatarFallback>
//                         </Avatar>
//                         <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
//                         </div>
//                     </div>
//                     <div className="w-full pl-3">
//                         <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
//                         <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
//                     </div>
//                 </Link>
//             </div>
//         </div>)
// }


export interface DropdownMenuContentProps
    extends React.HTMLAttributes<HTMLElement> {
    setDropdownOpen?(dropdownOpen: boolean): void,
    dropdownOpen?: boolean,
}

export interface ChildSlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ className, setDropdownOpen, dropdownOpen, ...props }, ref) => {

        const Comp = Slot 
        return (
            <Comp
                className={cn(className)}
                ref={ref}
                {...props}

            />
        )
    }
)
DropdownMenuContent.displayName = "Button"