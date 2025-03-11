"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import React from "react";

export default function CustomDrawer({
  children,
  trigger,
  triggerOptions,
  open,
  setOpen,
  className,
  title,
  description,
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  triggerOptions?: {
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
  };
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && (
        <DrawerTrigger
          className={cn(triggerOptions?.className, "flex items-center gap-1")}
          asChild
        >
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent
        className={cn([`h-fit z-[50] rounded-t-3xl  `, className])}
      >
        {/* <DrawerTrigger className=" fixed top-4 right-4">
          <X />
        </DrawerTrigger> */}
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-x-2 font-medium text-xl">
            {title}
          </DrawerTitle>
          {description && (
            <DrawerDescription className="bg-gradient-to-tr from-slate-200 to-zinc-200 p-2.5 rounded-xl  text-overflow-1 text-[13px] text-black/70 font-medium">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
