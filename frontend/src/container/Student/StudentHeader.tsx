import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import AppLogo from "../../../public/logo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import { LogOut, Mail, Search, Settings, User } from "lucide-react";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { serverBaseURL } from "../../utils/options/server";
import { logout } from "../../utils/Services/LocalStorageTokenService";
import Transition from "../../utils/Transition";
import { useGetAllNotificationQuery } from "../../redux/features/Assessments/AssessmentApi";
import moment from "moment";
import { CardDescription } from "../../@/components/ui/card";

type HeaderProps = {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

const StudentHeader: FC<HeaderProps> = ({ setShowSidebar, showSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const Navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const { data: notificationData } = useGetAllNotificationQuery(user.studentId);
  // close on click outside

  useEffect(() => {
    console.log(notificationData);
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <div className=" fixed  z-30 border-b bg-white w-full">
      <div className="px-3 py-3 lg:px-4 lg:pl-3">
        <div className="flex justify-between items-center">
          {/* Left Content */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 "
            >
              {!showSidebar ? (
                //    {/* Mobile hamburger icon */}
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                // {/* Mobile close icon */}
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            {/*  Icon */}
            <Link to={"/"} className="ml-2 md:mr-24 flex flex-shrink-0">
              <img src={AppLogo} loading="lazy" className=" h-10" />
              <span className=" ml-2  self-center text-center text-xl font-semibold whitespace-nowrap sm:text-2xl">
                LMS
              </span>
            </Link>
            <form action="#" className="hidden lg:block lg:pl-12">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {/* <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg> */}
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="topbar-search"
                  className=" border border-gray-300 outline-none rounded py-2 w-full pl-9 placeholder:text-gray-500 placeholder:font-roboto placeholder:font-[400] text-gray-700"
                  placeholder="Search any thing ..."
                />
              </div>
            </form>
          </div>
          {/* Right Content */}
          <div className="flex items-center flex-row ">
              <CardDescription className=" ">
                  <span className=" text-base font-medium capitalize">
                    {" "}
                    {user?.role},{" "}
                  </span>{" "}
                  {user?.full_name}
                </CardDescription>
            <div className="hidden mr-3 mb-1 sm:block">
              
              <button className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100">
                <span className="sr-only">Search</span>
                {/* <!-- Search icon --> */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {/*  */}           
              {/* <!-- Notifications --> */}
              <button
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">View notifications</span>
                {/* <!-- Bell icon --> */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              
              {/* Notification card */}
              <Transition
                className={`right-0 origin-top-right absolute  z-10 top-full  mt-1`}
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                appear={undefined}
              >
                <div
                  ref={dropdown}
                  className="z-50  max-w-sm  overflow-y-scroll max-h-96  text-base bg-white divide-y divide-gray-100 rounded shadow-lg "
                >
                  <div className="block px-4 py-2 text-base font-medium text-center bg-gray-50 text-gray-700 ">
                    Notifications
                  </div>
                  <div>
                    {notificationData?.map((data) => (
                      <Link
                        className="flex px-4 py-3 border-b hover:bg-gray-100"
                        to={"#"}
                      >
                        <div className="flex-shrink-0">
                          <Avatar>
                            <AvatarImage
                              className="rounded-full w-11 h-11"
                              src={serverBaseURL + user?.profile_picture}
                            />
                            <AvatarFallback>WN</AvatarFallback>
                          </Avatar>
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                            New message arrived : {`"${data?.description}"`}
                          </div>
                          <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                            {moment(data?.date).fromNow()}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Transition>
            </div>
            {/* user icon */}
            <div className="flex items-center ml-2">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open user menu</span>
                      <Avatar>
                        <AvatarImage
                          className="rounded-full w-11 h-11"
                          src={`${serverBaseURL}${user?.profile_picture}`}
                        />
                        <AvatarFallback>{user?.full_name[0]}.</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 mr-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>{user?.full_name}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>{user?.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                          Navigate("/teacher-login");
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Dropdown menu */}
            </div>
            {/* User card */}
            {/* <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow ">
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  Neil Sims
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
