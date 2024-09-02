import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../../public/logo.png";
import { FC, useEffect } from "react";
import { Button } from "../../@/components/ui/button";
import { z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../utils/options/imageConfiguration";
import { toast } from "sonner";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const formSchema = z
  .object({
    email: z
      .string()
      .email("Enter  a valid email")
      .min(6, "Email must contain minimum 6 character(s)"),
    full_name: z
      .string()
      .refine(
        (data) => new RegExp(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/).test(data),
        "Please Enter a valid name"
      ),
       username: z
      .string({message: 'username must be unique with no spaces'}),
    password: z
      .string()
      .regex(/[0-9]/, getCharacterValidationError("digit"))
      .regex(/[a-z]/, getCharacterValidationError("lowercase"))
      .regex(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must contain at least 8 character(s)"),
    phone_no: z
      .string()
      .regex(/[0-9]/, getCharacterValidationError("digit"))
      .max(11, "only 11 digits are required")
      .min(11, "only 11 digits are required"),
    qualification: z
      .string({ message: "qualification is required" })
      .min(10, "minimum 10 chars are required"),
    skills: z
      .string({ message: "skills is required" })
      .min(10, "minimum 10 chars are required"),
    profile_picture: z
      .instanceof(File)
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterProps = {};

const Register: FC<RegisterProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      full_name: "",
      password: "",
      confirmPassword: "",
      phone_no: "",
      qualification: "",
      skills: "",
      profile_picture: null,
    },
  });

  const [register, {isLoading, error,isSuccess,data}] =useRegisterUserMutation()
  const navigate = useNavigate()
  
  async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    form.reset();
   await  register(values)
  }

    useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: data?.message
      })
      navigate('/teacher-login')
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
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto   ">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 "
        >
          <img
            className="w-20 h-20 mr-2"
            loading="lazy"
            src={AppLogo}
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register as Teacher
            </h1>
            <Form {...form}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={form.handleSubmit(
                  async (data) => await onSubmitAsync(data)
                )}
              >

                 <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SheikhAnas..."
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                <div className="grid lg:grid-cols-2 gap-y-4  grid-cols-1 gap-x-4 w-full">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                </div>
                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormDescription>
                        i.e Degrees and certificates
                      </FormDescription>

                      <FormControl>
                        <Textarea
                          placeholder="Write your qualification"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormDescription>i.e MS Office etc</FormDescription>
                      <FormControl>
                        <Textarea placeholder="Write your Skills" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile_picture"
                  render={({ field : {onChange, value, ...fieldProps}}) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormDescription>
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </FormDescription>
                      <FormControl>
                        <Input type="file"  {...fieldProps}   onChange={(e)=> {onChange(e.target.files[0])}} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone no" type="text" {...field} />
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
                        <Input placeholder="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                   <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="confirm password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
                  Register
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/teacher-login"
                    className="font-medium  hover:underline "
                  >
                    Signin
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
