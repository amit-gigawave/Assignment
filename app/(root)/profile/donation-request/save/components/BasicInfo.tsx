import { CustomCheckboxes } from "@/components/custom/CustomCheckBoxes";
import CustomHeading from "@/components/custom/CustomHeading";
import CustomInput from "@/components/custom/CustomInputs";
import React from "react";
import { motion } from "framer-motion";
import { DonationRequestType } from "@/models/schema";
import { UseFormReturn } from "react-hook-form";
import { useGetCategoriesQuery } from "@/services/query/causeQuery";

const BasicInfo = ({
  form,
  title,
  description,
  delta,
}: {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
}) => {
  const { data } = useGetCategoriesQuery();
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
        name="title"
        label="Title"
        type="text"
        placeholder="Title"
      />

      <CustomInput
        control={form.control}
        name="description"
        label="Description"
        type="text"
        placeholder="Description"
        showTextArea
      />

      <CustomCheckboxes
        control={form.control}
        name="categories"
        options={
          data
            ? data.map((item: { name: string; id: string }) => {
                return {
                  label: item.name,
                  id: item.id,
                };
              })
            : []
        }
        label="Category"
      />

      <CustomInput
        control={form.control}
        name="name"
        label="Name"
        type="text"
        placeholder="Name"
      />

      <div className="flex flex-col sm:flex-row gap-3 w-full items-stretch">
        {/* <MultiPhoneInput control={form.control} name="phones" />
        <MultiEmailInput control={form.control} name="emails" />
         */}

        <CustomInput
          control={form.control}
          name="phones[0]"
          label="Phone"
          type="text"
          placeholder="Enter phone number"
        />
        <CustomInput
          control={form.control}
          name="emails[0]"
          label="Email"
          type="text"
          placeholder="Enter email"
        />
      </div>
    </motion.div>
  );
};

export default BasicInfo;
