import { Form, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import BasicInfo from "./BasicInfo";
import AddressForm from "./AddressForm";
import ImageForm from "./ImageForm";
import FileForm from "./FileForm";
import AmountForm from "./AmountForm";
import PreviewForm from "./PreviewForm";
import { CustomButton } from "@/components/custom/CustomButtons";
import { useRouter } from "next/navigation";
import { useCreateCauseMutation } from "@/services/query/causeQuery";
import { useForm } from "react-hook-form";
import {
  DonationRequestSchema,
  DonationRequestType,
  DonationResponceType,
} from "@/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = [
  {
    id: 1,
    title: "Basic Information",
    fields: ["title", "description", "categories", "name", "emails", "phones"],
  },
  {
    id: 2,
    title: "Address Details",
    fields: ["address"],
  },
  {
    id: 3,
    title: "Images & Videos",
    fields: ["images", "videos"],
  },
  {
    id: 4,
    title: "Files & Guaranteers",
    fields: ["documents", "primaryGuaranteerName", "primaryGuaranteerPhone"],
  },
  {
    id: 6,
    title: "Amount",
    fields: [
      "amount",
      "deadline",
      "bankDetails",
      "aadharNumber",
      "panNumber",
      "upiLink",
    ],
  },
  {
    id: 7,
    title: "Complete",
  },
];

const CauseForm = ({ causeData }: { causeData: DonationResponceType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const router = useRouter();

  const {
    mutateAsync: createCause,
    isPending: createPending,
    isSuccess,
  } = useCreateCauseMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const delta = currentStep - prevStep;

  console.log({ causeData });

  const form = useForm<DonationRequestType>({
    resolver: zodResolver(DonationRequestSchema),
    defaultValues: !!causeData
      ? {
          ...causeData,
          videos: causeData.videos ?? [],
          deadline: new Date(causeData.deadline),
          secondaryGuaranteerName:
            causeData.secondaryGuaranteerName ?? undefined,
          secondaryGuaranteerPhone:
            causeData.secondaryGuaranteerPhone ?? undefined,
        }
      : {
          phones: [],
          emails: [],
          documents: [],
          categories: [],
        },
  });

  const handleSubmit = async (data: DonationRequestType) => {
    console.log(data);
    await createCause(data);
    if (isSuccess) router.back();
  };

  console.log({ isSuccess });

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as (keyof DonationRequestType)[], {
      shouldFocus: true,
    });
    console.log({ output }, form.formState.errors);
    if (!output) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setPrevStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === steps.length - 1) {
      form.handleSubmit(handleSubmit, (e) => console.log(e))();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setPrevStep(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}
        className=" px-4 md:px-10 pt-16 max-w-4xl mx-auto overflow-hidden flex flex-col gap-4 min-h-[calc(100vh-200px)] justify-between "
      >
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
        {currentStep === 0 && (
          <BasicInfo
            form={form}
            delta={delta}
            title={steps[currentStep].title}
            description={steps[currentStep].title}
          />
        )}
        {currentStep === 1 && (
          <AddressForm
            form={form}
            delta={delta}
            title={steps[currentStep].title}
            description={steps[currentStep].title}
          />
        )}

        {currentStep === 2 && (
          <ImageForm
            form={form}
            delta={delta}
            title={steps[currentStep].title}
            description={steps[currentStep].title}
          />
        )}

        {currentStep === 3 && (
          <>
            <FileForm
              form={form}
              delta={delta}
              title={steps[currentStep].title}
              description={steps[currentStep].title}
            />
            <FormMessage />
          </>
        )}

        {currentStep === 4 && (
          <AmountForm
            form={form}
            delta={delta}
            title={steps[currentStep].title}
            description={steps[currentStep].title}
          />
        )}

        {currentStep === 5 && (
          <PreviewForm
            form={form}
            delta={delta}
            title={steps[currentStep].title}
            description={steps[currentStep].title}
          />
        )}

        <div className="flex justify-between items-center">
          <CustomButton
            onClick={handlePrev}
            disabled={currentStep === 0}
            type="button"
            btnVariant="outlined"
            className="!rounded-xl !h-10"
          >
            Prev
          </CustomButton>
          <CustomButton
            onClick={handleNext}
            disabled={createPending}
            type="button"
            className="rounded-xl "
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
};

export default CauseForm;
