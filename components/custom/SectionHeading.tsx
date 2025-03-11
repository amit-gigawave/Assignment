import { cn } from "@/lib/utils";
import React from "react";

const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn(["text-2xl md:text-5xl font-bold", className])}>
      {children}
    </h2>
  );
};

export default SectionHeading;
