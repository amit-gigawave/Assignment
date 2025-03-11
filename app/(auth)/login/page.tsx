"use client";
import { useAuthStore } from "@/stores/authStore";
import React from "react";
import OTPForm from "./components/OTPForm";
import Login from "./components/Login";
import Image from "next/image";

export const runtime = "edge";

const Page = () => {
  const { isOtpSent } = useAuthStore();
  return (
    <section className="flex flex-col items-center md:mt-44 ">
      <Image
        src="/icons/logo2.svg"
        alt="hero"
        width={2000}
        height={2000}
        className="size-52"
      />
      {isOtpSent ? <OTPForm /> : <Login />}
    </section>
  );
};

export default Page;
