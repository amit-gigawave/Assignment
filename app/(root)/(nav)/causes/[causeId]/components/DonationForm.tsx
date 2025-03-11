"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import CustomInput from "@/components/custom/CustomInputs";
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/custom/CustomButtons";
import { IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DonationSchema } from "@/models/schema";
import { DonationType } from "@/models/schema";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CustomDrawer from "@/components/custom/CustomDrawer";
import CustomDialog from "@/components/custom/CustomDialog";
import { formatCurrency } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { PaymentMethods } from "@/constants/enums";
import FileUpload from "@/components/custom/FileUploader";
import { Checkbox } from "@/components/ui/checkbox";
import { useSubmitDonationMutation } from "@/services/query/userQuery";
import { useUploadMutation } from "@/services/query/uploadQuery";
import { useRouter } from "next/navigation";

function Component({ causeId }: { causeId: string }) {
  const router = useRouter();
  const { isPending, mutate } = useSubmitDonationMutation();
  const { isPending: isUploadPending, mutateAsync: uploadFile } =
    useUploadMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const form = useForm<DonationType>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      causeId: causeId,
    },
  });

  function onSubmit(data: DonationType) {
    console.log(data);
    mutate(data);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const items = [
    {
      label: "Cash",
      value: PaymentMethods.CASH,
    },
    {
      label: "Cheque",
      value: PaymentMethods.CHEQUE,
    },
    {
      label: "UPI",
      value: PaymentMethods.UPI,
    },
    {
      label: "Credit Card",
      value: PaymentMethods.CREDIT_CARD,
    },
    {
      label: "Debit Card",
      value: PaymentMethods.DEBIT_CARD,
    },
    {
      label: "Net Banking",
      value: PaymentMethods.NET_BANKING,
    },
    {
      label: "NEFT",
      value: PaymentMethods.NEFT,
    },
    {
      label: "RTGS",
      value: PaymentMethods.RTGS,
    },
    {
      label: "IMPS",
      value: PaymentMethods.IMPS,
    },
    {
      label: "Others",
      value: PaymentMethods.OTHERS,
    },
  ];

  if (!isLoggedIn) {
    router.push("/login");
    return <></>;
  }

  // console.log({ isUploadPending });
  const docInstance = form.watch("receipt");
  return (
    <Card className="w-full mx-auto  relative shadow-none min-h-[350px] md:min-h-[520px]  pb-5 max-h-[350px] md:!max-h-[500px] overflow-hidden pt-0  border-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-h-[350px] md:max-h-full overflow-y-auto pb-16 px-6 pt-2"
        >
          <div className="space-y-5">
            <CustomInput
              control={form.control}
              name="amount"
              label="Amount"
              placeholder="Enter amount"
              type="number"
              leading={<IndianRupee className="text-gray-400 size-4" />}
              className="w-full"
            />
            <CustomSelect
              control={form.control}
              name="paymentMethod"
              label="Payment Method"
              placeholder="Select Payment Method"
              items={items}
              showSearch={false}
            />
            <CustomInput
              control={form.control}
              name="paymentId"
              label="Payment ID"
              placeholder="Enter Payment ID"
              type="text"
              className="w-full"
            />
            <FileUpload
              onUploadComplete={async (file) => {
                const res = await uploadFile(file);
                console.log(res.data);
                form.setValue("receipt", res.data.fileName);
              }}
              // uploaded={form.getValues("videos")}
              onDelete={() => form.setValue("receipt", "")}
              acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
              maxSizeInMB={1}
              label="Upload Receipt"
              subLabel="Select Receipt"
              showUploader={!docInstance}
              isUploading={isUploadPending && !form.getValues("receipt")}
            />
            <FormField
              control={form.control}
              name="isAnonomous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-end gap-2 ml-2 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className=""
                    />
                  </FormControl>
                  <FormLabel>Donate as Anonymous.</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5 absolute bottom-0 left-0  bg-white p-4 w-full border-t">
            <div className="text-lg font-semibold">
              Donation Total:
              <span className="text-primary pl-2">
                {formatCurrency(form.getValues("amount") || 0)}
              </span>
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/60 text-white px-8 mx-auto sm:mx-0"
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

const DonationForm = ({ causeId }: { causeId: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? (
    <CustomDrawer
      trigger={<CustomButton>Submit Donation Details</CustomButton>}
      title={"Donation Information"}
    >
      <Component causeId={causeId} />
    </CustomDrawer>
  ) : (
    <CustomDialog
      trigger={<CustomButton>Submit Donation Details</CustomButton>}
      className="p-0"
      title={"Donation Information"}
    >
      <Component causeId={causeId} />
    </CustomDialog>
  );
};
export default DonationForm;
