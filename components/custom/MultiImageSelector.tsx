import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, FC, ReactNode, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
// import { ImageCropper } from "./ImageCropper";
import { CustomAlert } from "./CustomAlert";
import { uploadBlog } from "@/services/api/blog-upload";

export const ImageDialog = ({
  imageUrl,
  field,
  setViewImg,
}: {
  imageUrl: string;
  field: ControllerRenderProps;
  setViewImg: (val: string | null) => void;
}) => {
  console.log("selected image", { imageUrl });
  const removeImage = () => {
    field.onChange((field.value as string[]).filter((v) => v !== imageUrl));
  };

  return (
    <Dialog open={imageUrl != null}>
      <DialogContent
        // hideCloseBtn
        className="p-5 bg-transparent border-none rounded-lg"
      >
        <button
          className="absolute right-8 top-8 text-black rounded-full bg-white shadow-lg w-6 h-6 hover:scale-[1.2] active:scale-[1.02] duration-200"
          onClick={() => setViewImg(null)}
        >
          <span>X</span>
        </button>
        <button
          className="absolute left-8 top-8 text-white rounded-full  shadow-lg w-7 h-7 hover:scale-[1.1] active:scale-[1.02] flex items-center justify-center bg-red-300 duration-200 "
          onClick={() => {
            removeImage();
            setViewImg(null);
          }}
        >
          <Image
            src="/admin/icons/delete.svg"
            alt="delete"
            width={18}
            height={18}
            className="flex items-center justify-center bg-red-300 rounded-md"
          />
        </button>
        <Image
          src={imageUrl}
          alt="image +"
          width={1000}
          height={1000}
          className={"bg-white/10 w-full h-full object-center rounded-md"}
        />
      </DialogContent>
    </Dialog>
  );
};

type MultiImageProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  min?: number;
  max?: number;
  description?: ReactNode;
  label?: string;
  subLabel?: string;
  maxSize?: number;
};

// eslint-disable-next-line
const MultiImageSelection: FC<MultiImageProps<any>> = ({
  control,
  name,
  max = 4,
  description,
  label,
  subLabel,
  maxSize = 1000,
}) => {
  const [viewImg, setviewImg] = useState<string | null>();

  const { field } = useController({ name });

  const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size / 1000 > maxSize) {
        control.setError(name, {
          message: `File Size should be less than ${maxSize}kb`,
        });
        return;
      }

      const res = await uploadBlog(file);
      console.log(res.data);
      field.onChange([...(field.value || []), res.data.fileName]);
      // console.log("file items :", file.size, file.name);
      // const reader = new FileReader();
      // reader.addEventListener("load", () => {
      //   const imageUrl = reader.result as string;
      //   console.log({ imageUrl });
      //   // setSelectedImg(imageUrl);
      //
      // });
      // reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log(" field value >>>>", field);
        return (
          <div className="space-y-[5px]">
            {label && (
              <FormLabel className="ml-1 text-start text-black/70 font-semibold">
                {label}
                {subLabel && (
                  <span className="text-black/40 text-xs ml-2">{subLabel}</span>
                )}
              </FormLabel>
            )}
            <FormItem className="flex gap-2.5 max-w-2xl mx-auto items-center md:flex-row flex-col">
              {/* {selectedImg && (
                <ImageCropper
                  onClose={() => setSelectedImg(null)}
                  onSuccess={(croppedImage) => {
                    setSelectedImg(null);
                    field.onChange([...(field.value || []), croppedImage]);
                    console.log("<<<<< field value >>>", field.value);
                  }}
                  selectedImg={selectedImg}
                />
              )} */}
              {viewImg && (
                <ImageDialog
                  imageUrl={viewImg}
                  field={field}
                  setViewImg={setviewImg}
                />
              )}

              <div
                className={`flex-1 w-full bg-white relative h-64 p-3 rounded-xl overflow-clip border-2 border-dashed border-black/30 hover:border-secondary-foreground/80 duration-300 input-shadow flex items-center justify-center flex-col gap-3 peer ${
                  max === 1 ? "!p-0 !mx-28" : ""
                }`}
              >
                {max === 1 && field.value?.length === 1 ? (
                  <Image
                    src={field.value[0]}
                    alt="image +"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setviewImg(field.value[0])}
                  />
                ) : (
                  <>
                    <FormControl>
                      {field.value?.length < max ||
                      field.value === undefined ? (
                        <input
                          className="h-full w-full opacity-0 absolute z-50 cursor-pointer"
                          placeholder="select image"
                          type="file"
                          //   disabled={!(field.value.length < max)}
                          onChange={onSelectFile}
                          accept="image/jpeg,image/jpg,image/png,video/mp4"
                        />
                      ) : (
                        <CustomAlert
                          title={`You can add maximum of ${max} images`}
                        />
                      )}
                    </FormControl>
                    <FormDescription className="text-xs font-medium text-center text-zinc-400 ">
                      {description ?? (
                        <span className="flex flex-col gap-y-3 leading-5 items-center justify-between">
                          Take a picture and leave it here or click to select a
                          photo .
                          <Image
                            src="/icons/image.svg"
                            alt="image +"
                            width={40}
                            height={40}
                            className="opacity-20 my-auto "
                          />
                          <br /> You can add maximum of {max}{" "}
                          {max > 1 ? "images each" : "image"} of {maxSize}kb
                          maximum
                        </span>
                      )}
                    </FormDescription>
                  </>
                )}
                <FormMessage className="text-xs" />
              </div>
              {max > 1 && (
                <ul className="flex flex-1 flex-wrap gap-2.5 items-center justify-center">
                  {Array.from({ length: max }).map((_, index) => {
                    const baseUrl = "/icons/image.svg";
                    const imageUrl = field.value
                      ? field.value[index] ?? baseUrl
                      : baseUrl;
                    const noImage = baseUrl === imageUrl;
                    return (
                      <li
                        key={index}
                        className={cn([
                          "rounded-lg border-[1.5px] border-black/[0.15] h-20 w-20  sm:h-24 sm:w-24 bg-white flex items-center justify-center overflow-clip",
                          noImage && "border-dashed",
                        ])}
                      >
                        {baseUrl === imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt="image +"
                            width={30}
                            height={30}
                            className="opacity-20"
                          />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt="image +"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setviewImg(imageUrl)}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export default MultiImageSelection;
