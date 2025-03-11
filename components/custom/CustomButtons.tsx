"use client";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

type CustomButtonProps = ButtonProps & {
  btnVariant?: "default" | "outlined" | "dark";
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export const CustomButton = ({
  children,
  className,
  btnVariant = "default",
  leading,
  trailing,
  ...props
}: CustomButtonProps) => {
  const baseStyles =
    "!flex items-center gap-2 text-base shadow-none text-primary bg-transparent hover:bg-transparent  h-11 px-7 font-semibold transition-all duration-300 rounded-xl ";

  const variantStyles = {
    default:
      "shadow-none text-white bg-primary hover:bg-primary/80 px-10 h-fit py-2 rounded-2xl",
    outlined:
      "border-[2px]  border-secondary-foreground/30 text-secondary-foreground font-bold hover:bg-primary/50 rounded-2xl hover:text-white text-base bg-primary/5 h-fit px-10 py-2",
    dark: " bg-secondary-foreground rounded-lg text-white text-base font-normal hover:bg-primary/80",
  };

  return (
    <Button
      className={cn([baseStyles, variantStyles[btnVariant], className])}
      {...props}
    >
      {leading && <span className="">{leading}</span>}
      {children}
      {trailing && <span className="">{trailing}</span>}
    </Button>
  );
};
