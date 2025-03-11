"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";

interface ReusableDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  isRange?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function ReusableDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder = "Select date",
  isRange = false,
  minDate,
  maxDate,
  className,
}: ReusableDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col  w-full py-1", className)}>
          <FormLabel className="ml-1 !mb-0 text-start text-black/70 font-semibold ">
            {label}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className=" !mt-3" asChild>
              <FormControl className="">
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex items-center gap-x-3 !h-10 w-full rounded-xl border  border-secondary-foreground/20 px-3  text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white bg-white ",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    isRange ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value, "PPP")
                    )
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode={isRange ? "range" : "single"}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const isBeforeMinDate = minDate ? date < minDate : false;
                  const isAfterMaxDate = maxDate ? date > maxDate : false;
                  return isBeforeMinDate || isAfterMaxDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
