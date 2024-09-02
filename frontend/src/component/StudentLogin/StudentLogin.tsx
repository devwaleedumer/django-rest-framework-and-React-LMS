import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../../public/logo.png";
import {  useEffect, } from "react";
import { Button } from "../../@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { setTokens } from "../../utils/Services/LocalStorageTokenService";

const formSchema = z.object({
   email: z.string().email("Enter  a valid email").min(6, "Email must contain minimum 6 character(s)"),
    password: z.string().min(8, "Your Password must contain minimum 8 character(s)")
});


const StudentLogin = () => {
 
    const [login, {isLoading, error,isSuccess,data}] =useLoginUserMutation()
    const navigate = useNavigate()
  

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""

    },
  });

  // 2. Define a submit handler.
  async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    await login(values)
    form.reset()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: "login successfully"
      })
      setTokens({access: data.access,refresh: data.refresh})
      navigate('/student')
    }
    if (error) {
      
      if ("data" in error) {
        if('detail' in  error.data ){
             toast.error(
          ` Error!`,
          {
            description: `${error.data.detail}`
          })
          return
        }
        const errorData = error as any;
        toast.error(
          ` Error, occurred!`,
          {
            description: Object.entries(errorData?.data).map(([key,value]) => (value.map((er,index) => `'${key}' ${er} \r\n`)))
          })
      }
      else {
        toast.error(
          ` Error`,
          {
            description: "Some thing went wrong, please try again ",
          })
      }
    }
  }, [error, isSuccess])

 

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/Teacher-Login"}
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 "
        >
          <img
            className="w-20 h-20 mr-2"
            loading="lazy"
            src={AppLogo}
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Signin as Student
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (data) => await onSubmitAsync(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="*****" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/reset"
                    className="text-sm font-medium text-primary-600 hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button size="lg" className=" w-full" type="submit" disabled={isLoading}>
                  Login
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                 <div className="">
                   <Link
                    to="/student-signup"
                    className="font-medium  hover:underline "
                  >
                    Sign up
                  </Link>
                 </div>
                   <div>
                   <Link
                    to="/Teacher-Login"
                    className="font-medium  hover:underline "
                  >
                    Login as Teacher
                  </Link>
                </div>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLogin;
