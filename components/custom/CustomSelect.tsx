import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SelectHTMLAttributes, useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Path } from "react-hook-form";  // Add this import at the top

export type DropDownItemType = {
  value: string;
  label: string;
};

type CustomSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;  // Change keyof T to Path<T>
  label: string;
  placeholder: string;
  items: DropDownItemType[];
  onChange?: (v: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
} & SelectHTMLAttributes<HTMLDivElement>;

export const CustomSelect = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  showSearch = true,
  searchPlaceholder,
  items,
  onChange,
}: CustomSelectProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredList = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full space-y-[3px]">
            <FormLabel className="ml-1 text-start">{label}</FormLabel>
            <Select
              required
              disabled={field.disabled}
              defaultValue={field.value}
              onValueChange={onChange ?? field.onChange}
            >
              <SelectTrigger className=" flex items-center gap-x-3 h-10 w-full rounded-xl border  border-secondary-foreground/20 px-3 !py-0 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-visible:ring-ring/30  focus-within:ring-offset-white bg-white">
                {field.value
                  ? items.find(
                      (v) => v.value.toString() === field.value.toString()
                    )?.label
                  : placeholder ?? "Tap to select"}
              </SelectTrigger>
              <FormControl>
                <SelectContent className=" rounded-2xl shadow-lg  bg-white py-2 px-2 border border-input ">
                  {showSearch && (
                    <div className="mx-2 mt-2">
                      <Input
                        className="h-9"
                        placeholder={searchPlaceholder ?? "Search text ..."}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  )}
                  <SelectGroup className="m-3 max-h-[250px] overflow-scroll ">
                    {filteredList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}{" "}
                      </SelectItem>
                    ))}
                    {filteredList.length == 0 && (
                      <p className="text-sm text-center text-slate-500 ">
                        No items found
                      </p>
                    )}
                  </SelectGroup>
                </SelectContent>
              </FormControl>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
