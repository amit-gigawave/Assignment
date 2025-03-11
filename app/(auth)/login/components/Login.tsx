"use client";

import { Form } from "@/components/ui/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/custom/CustomInputs";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import { CustomButton } from "@/components/custom/CustomButtons";
import { useUploadMutation } from "@/services/query/uploadQuery";
import { cn } from "@/lib/utils";
import { useSignInWithGoogle } from "@/services/query/authQuery";

export const loginSchema = z.object({
  name: z.string().min(3, "Min 3 charactors are required."),
  email: z.string().email("email is not in the right format."),
  photo: z.string().url("photo is required."),
});

export type loginType = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { mutateAsync, isPending: isPendingUpload } = useUploadMutation();
  const { mutateAsync: login, isPending } = useSignInWithGoogle();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      photo: "",
    },
  });

  const onSubmit = async (data: loginType) => {
    console.log(data);
    await login(data);
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const response = await mutateAsync(file);
    form.setValue("photo", response.data.fileName);
    form.watch("photo");
    console.log(response);
  };

  console.log(form.watch("photo"));

  return (
    <div className="space-y-6 min-w-[300px] sm:!min-w-[400px] max-w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Label
              className={cn([
                "w-fit p-5 mx-auto rounded-full bg-background border  flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200 size-20",
                isPendingUpload && "animate-pulse",
                form.getValues("photo") && "p-0",
              ])}
              htmlFor="photo"
            >
              {form.getValues("photo") !== "" ? (
                <Image
                  src={form.getValues("photo")}
                  width={200}
                  height={200}
                  alt="photo"
                  className="size-20 rounded-full"
                />
              ) : (
                <User />
              )}
            </Label>
            <input
              type="file"
              className="hidden"
              id="photo"
              name="photo"
              onChange={handleFileUpload}
              accept="image/jpeg,image/jpg,image/png,video/mp4"
            />
            <span className="text-sm ">Profile Photo</span>
          </div>
          <CustomInput
            label="Name"
            control={form.control}
            name="name"
            placeholder="Enter Your name"
          />

          <CustomInput
            label="Email"
            control={form.control}
            name="email"
            placeholder="johndoe@gmail.com"
          />

          <CustomButton
            disabled={isPending}
            type="submit"
            className="w-full mt-8 "
          >
            Login {isPending && <Loader2 className="animate-spin" />}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default Login;
