import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CustomHeader = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn([
        "flex items-center gap-4 fixed top-0 left-0 right-0 backdrop-blur-lg text-primary w-full bg-white/5 right p-4  z-50",
        className,
      ])}
    >
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="p-2 rounded-full h-fit"
      >
        <ArrowLeft className=" !size-6" />
      </Button>
      <h3 className="text-xl  flex-1 text-center mr-10  font-bold">{title}</h3>
    </div>
  );
};

export default CustomHeader;
