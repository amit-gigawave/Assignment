import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import React from "react";

const Hero = () => {
  return (
    <section className="p-8 pb-16 md:pt-40 flex flex-col gap-6 items-center">
      <CustomBreadcrumb />
      <h3 className="text-4xl md:text-6xl font-bold leading-tight text-center text-secondary-foreground">
        Join Us in Making a Difference
      </h3>
      <p className="max-w-[600px] text-center">
        Become a part of our community and help us spread kindness and hope. 
        Your time and effort can bring positive change to those in need. 
        Together, we can create a brighter future for everyone.
      </p>
    </section>
  );
};

export default Hero;
