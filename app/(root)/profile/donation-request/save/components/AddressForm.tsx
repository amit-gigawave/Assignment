import CustomHeading from "@/components/custom/CustomHeading";
import CustomInput from "@/components/custom/CustomInputs";
import React from "react";
import { motion } from "framer-motion";
import { DonationRequestType } from "@/models/schema";
import { UseFormReturn } from "react-hook-form";

type AddressProps = {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
};
const AddressForm = ({ form, title, description, delta }: AddressProps) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" pb-4 space-y-4 rounded-t-xl"
    >
      <CustomHeading
        title={title}
        subtitle={description}
        isSmall
        className="pt-5"
      />
      <CustomInput
        control={form.control}
        label="Street"
        placeholder="Enter Flat, House no., Building, Company, Apartment"
        name="address.street"
      />
      <CustomInput
        control={form.control}
        label="Area"
        placeholder="Enter Area, Street, Sector, Village"
        name="address.area"
      />
      <CustomInput
        control={form.control}
        label="District"
        placeholder="Enter District"
        name="address.district"
      />
      <CustomInput
        control={form.control}
        label="Landmark"
        placeholder="Enter landmark"
        name="address.landmark"
      />
      <div className="flex flex-col sm:flex-row  gap-3 w-full items-stretch">
        <CustomInput
          control={form.control}
          label="City"
          name="address.city"
          placeholder="Enter City"
        />
        <CustomInput
          control={form.control}
          label="Pincode"
          name="address.zipcode"
          placeholder="Enter Pincode"
        />
      </div>
      <div className="flex  flex-col sm:flex-row  gap-3  w-full items-stretch">
        <CustomInput
          control={form.control}
          label="State"
          name="address.state"
          placeholder="Enter State"
        />
        <CustomInput
          control={form.control}
          label="Country"
          name="address.country"
          placeholder="Enter Country"
        />
      </div>
    </motion.div>
  );
};

export default AddressForm;
