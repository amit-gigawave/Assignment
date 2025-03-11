import FileUpload from "@/components/custom/FileUploader";
import React from "react";
import { motion } from "framer-motion";
import CustomHeading from "@/components/custom/CustomHeading";
import CustomInput from "@/components/custom/CustomInputs";
import { DonationRequestType } from "@/models/schema";
import { UseFormReturn } from "react-hook-form";
import { useUploadMutation } from "@/services/query/uploadQuery";

type FileProps = {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
};
const FileForm = ({ form, title, description, delta }: FileProps) => {
  const { mutateAsync: upload, isPending } = useUploadMutation();
  const length = form.watch("documents").length;
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
      <div>
        <FileUpload
          onUploadComplete={async (file) => {
            const res = await upload(file);
            console.log(res.data);
            form.setValue("documents", [
              ...(form.getValues("documents") || []),
              res.data.fileName,
            ]);
          }}
          uploaded={form.getValues("documents")}
          onDelete={(file) => {
            form.setValue(
              "documents",
              [...form.getValues("documents").filter((f) => f !== file)]
              // form.getValues("documents").filter((f) => f !== file)
            );
          }}
          acceptedFileTypes={[
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]}
          maxSizeInMB={1}
          showUploader={length < 2}
          multiple
          label="Upload Documents"
          subLabel="Select File"
          isUploading={isPending}
        />
        {form.formState.errors && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.documents?.message}
          </p>
        )}
      </div>
      <CustomHeading
        title={"Guaranteers"}
        // subtitle={description}
        isSmall
        className="pt-5"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomInput
          control={form.control}
          label="Guaranteers Name"
          name="primaryGuaranteerName"
          placeholder="Enter Guaranteers Name"
        />
        <CustomInput
          control={form.control}
          label="Guaranteers Number"
          name="primaryGuaranteerPhone"
          placeholder="Enter Guaranteers Number"
        />
        <CustomInput
          control={form.control}
          label="Guaranteers Name"
          subLabel="(Optional)"
          name="secondaryGuaranteerName"
          placeholder="Enter Guaranteers Name"
        />
        <CustomInput
          control={form.control}
          label="Guaranteers Number"
          subLabel="(Optional)"
          name="secondaryGuaranteerPhone"
          placeholder="Enter Guaranteers Number"
        />

        {form.formState.errors && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.primaryGuaranteerName?.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default FileForm;
