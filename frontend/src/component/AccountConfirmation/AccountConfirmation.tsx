import { Link, useParams } from "react-router-dom"
import { useAccountConfirmationQuery } from "../../redux/features/auth/authApi";
import { Loader } from "lucide-react";
import { cn } from "../../@/lib/utils";
import { useLocation } from 'react-router-dom';


const AccountConfirmation = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);
 const uid  = searchParams.get('uid');
 const token  = searchParams.get('token');

    const {isLoading,data,isError,isSuccess,error} = useAccountConfirmationQuery({uid,token},{
    skip: false
  })
  return (
!isLoading ? <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto min-w-3xl  lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold  text-primary-600 dark:text-primary-500">Account Confirmation!</h1>
            <p className={cn(`mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white`,isError && ' text-red-600', isSuccess&& 'text-green-600')}>{isError && "Account confirmation failed."}{isSuccess && 'Account confirmed successfully'}</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{isError && error?.data?.detail} {isSuccess && data?.message}</p>
            <Link to="/teacher-login" className="inline-flex text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Login</Link>
        </div>   
    </div>
</section> : 
    <div className="min-h-screen min-w-screen grid place-content-center">
        <Loader className="w-8 h-8 animate-spin"/>
    </div>
  )
}

export default AccountConfirmation