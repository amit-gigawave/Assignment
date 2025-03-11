import CustomHeading from "@/components/custom/CustomHeading";
import MultiImageSelection from "@/components/custom/MultiImageSelector";
import React from "react";
import { motion } from "framer-motion";
import FileUpload from "@/components/custom/FileUploader";
import { DonationRequestType } from "@/models/schema";
import { UseFormReturn } from "react-hook-form";
import { useUploadMutation } from "@/services/query/uploadQuery";

type ImageProps = {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
};
const ImageForm = ({ form, title, description, delta }: ImageProps) => {
  const { mutateAsync: upload, isPending } = useUploadMutation();
  const videoInstance = form.watch("videos");
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
      <MultiImageSelection
        control={form.control}
        name="images"
        max={5}
        maxSize={1000}
        label="Upload Images"
      />
      <FileUpload
        onUploadComplete={async (file) => {
          const res = await upload(file);
          console.log(res.data);
          form.setValue("videos", [
            ...(form.getValues("videos") || []),
            res.data.fileName,
          ]);
        }}
        uploaded={form.getValues("videos") ?? []}
        onDelete={() => form.setValue("videos", [])}
        acceptedFileTypes={["video/mp4"]}
        maxSizeInMB={5}
        label="Upload Video"
        subLabel="Select Video"
        showUploader={!videoInstance}
        isUploading={isPending}
      />
    </motion.div>
  );
};

export default ImageForm;
