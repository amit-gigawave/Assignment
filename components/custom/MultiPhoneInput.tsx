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
import { FC } from "react";

interface PhoneNumber {
  value: string;
}

interface FormValues extends FieldValues {
  phoneNumbers: PhoneNumber[];
}

interface MultiPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<FormValues>;
  className?: string;
}

// eslint-disable-next-line
const Component = ({ control, name, className }: MultiPhoneInputProps<any>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as string,
  });

  // useEffect(() => {
  //   if (fields.length === 0) {
  //     append(""); // Append empty string instead of object
  //   }
  // }, []); // Run only once on mount

  console.log({ fields, name });
  return (
    <div className={cn("", className)}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start  gap-2">
          <CustomInput
            // control={control}
            // name={`${name}.${index}`}
            // type="tel"
            // value={field.value}
            leading="+91"
            placeholder="Enter phone number"
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
          {fields.length < 3 && index === fields.length - 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 roundef mt-2"
              onClick={() => {
                append("");
              }}
            >
              <Plus className="!size-6 text-primary  border p-1 border-primary rounded-full" />
              {/* Add */}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line
const MultiPhoneInput: FC<MultiPhoneInputProps<any>> = ({
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
            Phone Numbers
          </FormLabel>
          <FormControl>
            {/* <Component control={control} name={name} /> */}
          </FormControl>
          {/* <FormDescription>You can add up to 3 phone numbers.</FormDescription> */}
          {/* <FormMessage className="text-xs" /> */}
        </FormItem>
      )}
    />
  );
};

export default MultiPhoneInput;
