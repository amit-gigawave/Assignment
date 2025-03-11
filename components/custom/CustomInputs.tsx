import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC, InputHTMLAttributes } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type TextFieldProps<T extends FieldValues> = {
  control?: Control<T>;
  label?: string;
  subLabel?: string;
  description?: string;
  placeholder?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showTextArea?: boolean;
  required?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line
const CustomInput: FC<TextFieldProps<any>> = ({
  control,
  required = true,
  label,
  description,
  leading,
  trailing,
  showTextArea,
  subLabel,
  name,
  placeholder,
  type,
  className,
  onChange,
  ...props
}) => {
  return control ? (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => {
        return (
          <FormItem className={cn("w-full space-y-2", className)}>
            <div className={cn([props.disabled && "text-secondary/40"])}>
              {label && (
                <FormLabel className="ml-1 text-start text-black/70 font-semibold">
                  {label}
                  <span className="text-black/40 text-xs ml-2">{subLabel}</span>
                </FormLabel>
              )}
              {description && (
                <FormDescription className="flex items-center gap-x-1 ml-1 text-[11px] text-black/40 font-medium">
                  {description}
                </FormDescription>
              )}
            </div>
            <FormControl>
              {showTextArea ? (
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder={placeholder}
                  className="min-h-[80px] max-h-[200px] border border-secondary-foreground/20  !text-sm !p-2 placeholder:text-gray-500 rounded-xl  ring-offset-background focus-within:ring-1 focus-within:!ring-offset-[0px] focus-within:!ring-ring/10  focus-within:!ring-offset-white"
                />
              ) : (
                <div
                  className={cn([
                    "flex items-center gap-x-3 h-10 w-full rounded-xl border  border-secondary-foreground/20 px-3 !py-0 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white bg-white ",
                    props.disabled && "bg-primary/10",
                  ])}
                >
                  {leading && <span className="">{leading}</span>}

                  <Input
                    {...field}
                    placeholder={placeholder}
                    {...props}
                    type={type}
                    value={field.value ?? ""}
                    className="no-spinner border-none w-full disabled:text-secondary/50 focus-within:!outline-none shadow-none outline-none  !text-sm !p-0 placeholder:text-gray-500  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent "
                    onChange={(v) => {
                      if (type === "number") {
                        const numericValue = parseFloat(v.target.value);
                        field.onChange(isNaN(numericValue) ? "" : numericValue);
                        return;
                      }
                      field.onChange(v.target.value);
                    }}
                  />
                  {trailing && <span className="">{trailing}</span>}
                </div>
              )}
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  ) : (
    <div
      className={cn([
        "flex items-center gap-x-3 w-full rounded-lg  border border-primary/15 px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white bg-white !h-[2.6rem]",
        className,
      ])}
    >
      {leading && <span className="">{leading}</span>}

      <Input
        placeholder={placeholder}
        {...props}
        required={required}
        type={type}
        className="no-spinner border-none w-full focus-within:!outline-none shadow-none outline-none  !text-sm !p-0 placeholder:text-secondary/80  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        onChange={onChange}
      />
      {trailing && <span className="">{trailing}</span>}
    </div>
  );
};

export default CustomInput;
