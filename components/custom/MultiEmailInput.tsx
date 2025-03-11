"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  type Control,
  type FieldValues,
  useFieldArray,
  type Path,
} from "react-hook-form";
import CustomInput from "./CustomInputs";
import { cn } from "@/lib/utils";
import { FormControl } from "../ui/form";
import { FormField, FormLabel } from "../ui/form";
import { FormItem } from "../ui/form";
import { type FC } from "react";

interface EmailAddress {
  value: string;
}

interface FormValues extends FieldValues {
  emailAddresses: EmailAddress[];
}

interface MultiEmailInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<FormValues>;
  className?: string;
}

// eslint-disable-next-line
const Component = ({ control, name, className }: MultiEmailInputProps<any>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as string,
  });

  // useEffect(() => {
  //   if (fields.length === 0) {
  //     append("");
  //   }
  // }, [fields]);

  return (
    <div className={cn("", className)}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <CustomInput
            control={control}
            name={`${name}.${index}`}
            type="email"
            placeholder="Enter email address"
            className="max-w-[250px]"
          />
          {index > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 "
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {fields.length < 2 && index === fields.length - 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 mt-2"
              onClick={() => append("")}
            >
              <Plus className="!size-6 text-primary  border p-1 border-primary rounded-full" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line
const MultiEmailInput: FC<MultiEmailInputProps<any>> = ({
  control,
  name,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn("w-full space-y-1", className)}>
          <FormLabel className="ml-1 text-start text-black/70 font-semibold">
            Email Addresses
          </FormLabel>
          <FormControl>
            <Component control={control} name={name} />
          </FormControl>
          {/* <FormDescription>You can add up to 3 email addresses.</FormDescription> */}
          {/* <FormMessage className="text-xs w-full !whitespace-nowrap" /> */}
        </FormItem>
      )}
    />
  );
};

export default MultiEmailInput;
