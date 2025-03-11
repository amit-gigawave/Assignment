import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import React from "react";

const Hero = () => {
  return (
    <section className="p-10 pb-10 md:pt-40 flex flex-col gap-6 items-center">
      <CustomBreadcrumb />
      <h3 className="text-4xl md:text-6xl font-bold leading-tight text-center text-secondary-foreground">
        Donate Today: Save a Life
      </h3>
      <p className="text-center max-w-sm text-gray-500 text-sm">
        Karma is the principle of cause and effect, which states that our
        actions have consequences, both in this life and in future lives. Giving
        is considered a good karma, as it brings positive consequences, such as
        happiness, prosperity, and spiritual growth.
      </p>
    </section>
  );
};

export default Hero;
