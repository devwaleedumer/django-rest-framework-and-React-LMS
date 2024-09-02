import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form";
import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../utils/options/imageConfiguration";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import { serverBaseURL } from "../../utils/options/server";
import MainContentLoader from "../Loader/MainContentLoader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetStudentProfileByIdQuery,
  useStudentUpdateProfileByIdMutation,
} from "../../redux/features/user/userApi";

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
    username: z.string({ message: "username must be unique with no spaces" }),
    id: z.number(),
    password: z
      .nullable(z.string())
      .optional()
      .or(
        z
          .string()
          .regex(/[0-9]/, getCharacterValidationError("digit"))
          .regex(/[a-z]/, getCharacterValidationError("lowercase"))
          .regex(/[A-Z]/, getCharacterValidationError("uppercase"))
      )
      .optional()
      .or(z.null()),
    confirmPassword: z
      .nullable(z.string())
      .optional()
      .or(
        z
          .string()
          .min(8, "Confirm Password must contain at least 8 character(s)")
      )
      .optional()
      .or(z.null()),
    phone_no: z
      .string()
      .regex(/[0-9]/, getCharacterValidationError("digit"))
      .max(11, "only 11 digits are required")
      .min(11, "only 11 digits are required"),
    address: z
      .string({ message: "qualification is required" })
      .min(10, "minimum 10 chars are required"),
    profile_picture: z
      .instanceof(File)
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .optional()
      .or(z.null()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ProfileSetting = () => {
  const [updateProfile, { isLoading, error, isSuccess, data }] =
    useStudentUpdateProfileByIdMutation();
  const user = useAppSelector((state) => state.user.user);
  const { data: studentData } = useGetStudentProfileByIdQuery(user.studentId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      password: null,
      confirmPassword: null,
      phone_no: studentData?.phone_no || "",
      address: studentData?.skills || "",
      profile_picture: null,
      id: user.id,
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("success", {
        description: data?.message,
      });
    }
    if (error) {
      if ("data" in error) {
        if ("detail" in error.data) {
          toast.error(` Error!`, {
            description: `${error.data.detail}`,
          });
          return;
        }
        const errorData = error as any;
        toast.error(` Error, occurred!`, {
          description: Object.entries(errorData?.data).map(([key, value]) =>
            value.map((er, index) => `'${key}' ${er} \r\n`)
          ),
        });
      } else {
        toast.error(` Error`, {
          description: "Some thing went wrong, please try again ",
        });
      }
    }
  }, [error, isSuccess]);

  const [image, setImage] = useState(null);

  const { setValue } = form;
  useEffect(() => {
    if (studentData) {
      setValue("phone_no", studentData.phone_no || "");
      setValue("address", studentData.address || "");
    }
  }, [studentData, setValue]);

  async function onSubmitAsync(values: z.infer<typeof formSchema>) {
    await updateProfile(values);
    form.reset();
  }

  return studentData !== undefined ? (
    <div className="bg-white min-h-screen  w-full flex flex-col md:flex-row  gap-5 px-3 lg:px-5  text-[#161931]">
      <aside className="hidden py-4  h-full  w-1/4 md:block">
        <div className="fixed flex flex-col gap-2  min-h-screen p-4 text-sm border-r border-indigo-100">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <Link
            to="#"
            className="flex items-center px-3 py-2.5 font-medium   text-primary border rounded-md bg-gray-100"
          >
            Profile Settings
          </Link>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1  md:w-3/4">
        <div className="p-2 md:p-4 w-full">
          <div className="w-full px-6 pb-8  mt-8 md:max-w-3xl sm:rounded-lg">
            <h2 className=" text-2xl font-medium md:text-xl">
              {" "}
              Profile Setting
            </h2>
            <div className="grid min-w-3xl mx-auto mt-6">
              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <Form {...form}>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={form.handleSubmit(
                        async (data) => await onSubmitAsync(data)
                      )}
                    >
                      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        <label htmlFor="profile_picture">
                          <div className="relative group flex items-center justify-center">
                            <Avatar className="h-32 w-32">
                              <AvatarImage
                                src={
                                  !image
                                    ? serverBaseURL + user.profile_picture
                                    : image
                                }
                                alt={`Profile Picture`}
                              />
                              <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <Edit className="absolute top-4 right-6 w-5 h-5 text-primary hidden group-hover:block cursor-pointer" />
                          </div>
                        </label>
                      </div>

                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John12Doe"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                                <Input
                                  placeholder="Email"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormDescription>
                              Address with street
                            </FormDescription>

                            <FormControl>
                              <Textarea
                                placeholder="Write your Address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                  

                      <FormField
                        control={form.control}
                        name="profile_picture"
                        render={({
                          field: { onChange, value, ...fieldProps },
                        }) => (
                          <FormItem className="hidden">
                            <FormLabel>Profile Picture</FormLabel>
                            <FormDescription>
                              SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </FormDescription>
                            <FormControl>
                              <Input
                                type="file"
                                id="profile_picture"
                                {...fieldProps}
                                onChange={(e) => {
                                  onChange(e.target.files[0]);
                                  const selectedFile = e.target.files[0];
                                  if (selectedFile) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setImage(reader.result); // Set preview image URL
                                    };
                                    reader.readAsDataURL(selectedFile); // Read file as data URL
                                  }
                                }}
                              />
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
                              <Input
                                placeholder="Phone no"
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
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="password"
                                type="password"
                                {...field}
                              />
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
                              <Input
                                placeholder="confirm password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        size="lg"
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                      >
                        Save
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <MainContentLoader />
  );
};

export default ProfileSetting;
