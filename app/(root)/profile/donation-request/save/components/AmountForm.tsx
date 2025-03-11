import { ReusableDatePicker } from "@/components/custom/CustomDatePicker";
import CustomInput from "@/components/custom/CustomInputs";
import React from "react";
import { motion } from "framer-motion";
import CustomHeading from "@/components/custom/CustomHeading";
import { DonationRequestType } from "@/models/schema";
import { UseFormReturn } from "react-hook-form";

type AmountProps = {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
};
const AmountForm = ({ form, title, description, delta }: AmountProps) => {
  const isPan = form.watch("amount") > 50000;
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
      <div className="grid grid-cols-1 md:grid-cols-2  gap-3 w-full items-stretch">
        <CustomInput
          control={form.control}
          label="Amount"
          name="amount"
          type="number"
          placeholder="Amount"
        />

        <ReusableDatePicker
          control={form.control}
          name="deadline"
          label="End Date"
          minDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
          maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)}
        />
        <CustomInput
          control={form.control}
          label="Account Number"
          name="bankDetails.accountNumber"
          placeholder="Enter Account Number"
        />
        <CustomInput
          control={form.control}
          label="IFSC Code"
          name="bankDetails.ifscCode"
          placeholder="Enter IFSC Code"
        />
        <CustomInput
          control={form.control}
          label="Bank Name"
          name="bankDetails.bankName"
          placeholder="Enter Bank Name"
        />
        <CustomInput
          control={form.control}
          label="Branch Name"
          name="bankDetails.branchName"
          placeholder="Enter Branch Name"
        />
        <CustomInput
          control={form.control}
          label="Account Holder Name"
          name="bankDetails.holderName"
          placeholder="Enter Account Holder Name"
        />
        <CustomInput
          control={form.control}
          label="UPI ID"
          name="backDetails.upiId"
          placeholder="Enter UPI ID"
        />
        <CustomInput
          control={form.control}
          label="Aadhar Number"
          name="identity.aadharNumber"
          placeholder="Enter Pan Number"
        />
        {isPan && (
          <CustomInput
            control={form.control}
            label="Pan Card Number"
            name="identity.panNumber"
            placeholder="Enter Pan Number"
          />
        )}
      </div>
    </motion.div>
  );
};

export default AmountForm;
