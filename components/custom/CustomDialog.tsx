"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function CustomDialog({
  children,
  open,
  setOpen,
  title,
  className,
  trigger,
  triggerClassName,
  description,
  closeButton = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  closeButton?: boolean;
  description?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger
          className={cn(triggerClassName, "flex items-center gap-1")}
          asChild
        >
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          "!rounded-2xl space-y-0 gap-0",
          className,
          closeButton ? "" : "[&>button]:hidden",
          "outline-none"
        )}
      >
        <DialogHeader className="text-start p-4 mb-0 border-b ">
          <DialogTitle
            className={cn(
              "flex items-center gap-x-2 font-medium text-xl",
              title ? "" : "hidden"
            )}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="bg-gradient-to-tr from-slate-200 to-zinc-200 p-2.5 rounded-xl  text-overflow-1 text-[13px] text-black/70 font-medium">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
