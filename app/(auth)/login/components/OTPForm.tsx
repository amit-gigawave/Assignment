"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/stores/authStore";

const OTPSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type OTPType = z.infer<typeof OTPSchema>;
const OTPForm = () => {
  const { phoneNumber, setIsOtpSent } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState<number>(119);

  const handleResendOtp = () => {
    setTimeLeft(119);
  };

  const onSubmit = () => {};

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <>
        <span className="text-primary font-bold px-1">
          {minutes.toString().padStart(2, "0")}:
          {remainingSeconds.toString().padStart(2, "0")}{" "}
        </span>
        {minutes > 0 ? "min" : "sec"}
      </>
    );
  };

  // Countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const form = useForm<OTPType>({
    resolver: zodResolver(OTPSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-7"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center w-full space-y-4">
              <FormLabel className="text-3xl font-bold">Enter Otp</FormLabel>
              <FormDescription className="my-5 leading-5">
                <span className="text-sm">
                  We have sent an OTP to
                  <span className=" font-extrabold tracking-wide pl-2">
                    {phoneNumber}
                  </span>
                  . This OTP will expire in 15 minutes.
                </span>
              </FormDescription>
              <div>
                <FormControl className="mx-auto w-fit">
                  <InputOTP maxLength={6} {...field} className="mx-auto w-fit">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPGroup
                        key={index}
                        className=" w-14 h-14 backdrop-blur-xl bg-white border border-input rounded-xl "
                      >
                        <InputOTPSlot
                          index={index}
                          className=" rounded-xl !border-none text-center font-bold w-full h-full ring-0 bg-transparent shadow-none"
                        />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs m-0 mt-2" />
              </div>
            </FormItem>
          )}
        />

        <div className="text-sm flex ml-auto w-fit items-center">
          {timeLeft > 0 ? (
            <p className=" font-medium text-muted-foreground">
              Resend OTP in {formatTime(timeLeft)}
            </p>
          ) : (
            <p className=" font-medium text-muted-foreground cursor-pointer">
              Didn&apos;t received OTP?{" "}
              <span
                className="text-primary font-bold ml-1 hover:underline"
                onClick={handleResendOtp}
              >
                Resend
              </span>
            </p>
          )}
        </div>
        <div className="flex gap-4 max-w-md">
          <Button
            type="reset"
            variant={"outline"}
            className="rounded-xl flex-1 font-bold bg-white"
            onClick={() => setIsOtpSent(false)}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="rounded-xl flex-1 font-bold "
            //   onClick={() => router.replace("/home")}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OTPForm;
