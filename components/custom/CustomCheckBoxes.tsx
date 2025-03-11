import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

type CheckboxOption = {
  id: string;
  label: string;
};

type CustomCheckboxesProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: CheckboxOption[];
  label?: string;
  description?: string;
};

export function CustomCheckboxes<T extends FieldValues>({
  control,
  name,
  options,
  label,
  description,
}: CustomCheckboxesProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="ml-1 text-start text-black/70 font-semibold">
              {label}
            </FormLabel>
          )}
          {description && <FormMessage>{description}</FormMessage>}
          <div className="flex gap-y-2 flex-wrap">
            {options.map((option) => (
              <FormItem
                key={option.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    className="peer hidden"
                    checked={field.value?.includes(option.id)}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      return checked
                        ? field.onChange([...currentValue, option.id])
                        : field.onChange(
                            currentValue.filter((value) => value !== option.id)
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm bg-white peer-aria-checked:bg-primary/5 p-1 px-5 rounded-full border border-secondary-foreground/30 text-secondary-foreground/50 peer-aria-checked:border-primary peer-aria-checked:text-primary cursor-pointer transform transition-colors ease-in-out duration-200">
                  {option.label}
                </FormLabel>
              </FormItem>
            ))}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
