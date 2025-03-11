"use client";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import SectionHeading from "@/components/custom/SectionHeading";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";
import DonationForm from "./components/DonationForm";
import Details, { InfoItem, SectionTitle } from "./components/Details";
import { useParams } from "next/navigation";
import { useGetCauseByID } from "@/services/query/causeQuery";
import { formatCurrency } from "@/lib/utils";
import ReactPlayer from "react-player";
import CustomLoader from "@/components/custom/CustomLoader";
import {
  Banknote,
  Building,
  Calendar,
  CreditCard,
  Hash,
  IndianRupee,
} from "lucide-react";
import { DonationResponceType } from "@/models/schema";
import { CustomButton } from "@/components/custom/CustomButtons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const runtime = "edge";

// const cause = {
//   id: 1,
//   title: "Clean Water for All",
//   description:
//     "Dolor donec eget morbi nisi. Eu ut et enim ornare nisi vel auctor odio a. Curabitur porttitor quis gravida porttitor vel...",
//   image: "/images/hero.png",
//   goal: 12000,
//   raised: 8000,
//   donations: 14,
// };
const AmountDetails = ({ cause }: { cause: DonationResponceType }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: cause.title,
        text: `Support ${cause.title} on DaanaKarma`,
        url: window.location.href,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    !!cause && (
      <div className="space-y-4 md:sticky md:top-24">
        <SectionTitle title="Amount Details" icon={IndianRupee} />
        <Progress
          value={(cause.fundRaised / cause.amount) * 100}
          className="h-3 "
        />
        <div className="flex justify-between items-center text-sm p-2">
          <div className="space-y-1 flex-1">
            <p className="text-muted-foreground">Raised</p>
            <p className="text-secondary-foreground font-bold text-sm sm:text-xl">
              <span className="text-blue-500">
                {formatCurrency(cause.fundRaised)}
              </span>{" "}
              / {formatCurrency(cause.amount)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm sm:text-xl text-blue-500">
              {cause.totalDonations}
            </p>
            <p className="text-muted-foreground">donations</p>
          </div>
        </div>

        <div className="bg-white/60 p-2 rounded-xl shadow-sm border border-orange-100/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              label="Deadline"
              value={new Date(cause.deadline)?.toLocaleDateString()}
              icon={Calendar}
            />
          </div>

          <div className=" p-4 bg-orange-50/50 rounded-xl">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Banknote className="w-4 h-4" />
              Bank Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label="Account Holder"
                value={cause.bankDetails?.holderName}
              />
              <InfoItem label="Bank Name" value={cause.bankDetails?.bankName} />
              <InfoItem label="Branch" value={cause.bankDetails?.branchName} />
              <InfoItem
                label="Account Number"
                value={cause.bankDetails?.accountNumber}
              />
              <InfoItem label="IFSC Code" value={cause.bankDetails?.ifscCode} />
              <InfoItem
                label="UPI ID"
                value={cause.bankDetails.upiID}
                icon={CreditCard}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Aadhar Number"
              value={cause.identity.aadharNumber}
              icon={Hash}
            />
            {cause.identity.panNumber && (
              <InfoItem
                label="PAN Number"
                value={cause.identity.panNumber}
                icon={Building}
              />
            )}
          </div>
        </div>
        <CustomButton
          onClick={handleShare}
          className="mx-auto"
          btnVariant={"dark"}
          // className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Image
            src="/icons/share.svg"
            alt="Share"
            width={20}
            height={20}
            className="w-4 h-4"
          />
          Share This Cause
        </CustomButton>
      </div>
    )
  );
};
export default function CausePage() {
  // console.log({ causeId });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const params = useParams();
  const causeId = params.causeId;
  const { data: cause, isPending, error } = useGetCauseByID(causeId as string);
  console.log({ params });

  return (
    <section className="p-5 sm:pt-24 space-y-3 relative ">
      {!!cause && (
        <div className="px-44">
          <CustomBreadcrumb last={"Cause Details"} />
          <SectionHeading className="!mb-8 line-clamp-1">
            {cause.title}
          </SectionHeading>
        </div>
      )}

      {(isPending || !cause) && <CustomLoader />}
      {!!error && <p>No Data Found.</p>}

      {!!cause && (
        <div className="grid grid-col-1 md:grid-cols-[2fr,1fr] max-w-6xl mx-auto gap-7 h-full">
          <div className="max-w-3xl mx-auto w-full space-y-4 ">
            {/* <Image
              src={cause?.images[0]}
              alt={cause.title}
              width={1000}
              height={1000}
              className="rounded-xl "
            /> */}

            {/* <ImageCarousel images={cause.images} /> */}
            <div className="flex flex-wrap gap-5">
              {cause.images.map((item: string) => (
                <Image
                  key={item}
                  src={item}
                  alt={item}
                  width={400}
                  height={400}
                  className="aspect-video w-52 rounded-xl"
                />
              ))}
            </div>

            <DonationForm causeId={cause.id} />
            {isMobile && <AmountDetails cause={cause} />}
            <Details cause={cause} />

            {!!cause.videos && (
              <div className="flex flex-col gap-2 pt-4">
                <h3 className="text-lg font-semibold">Supporting Videos</h3>

                {cause.videos.map((video: string) => (
                  <ReactPlayer
                    key={video}
                    url={video}
                    controls
                    width="100%"
                    // height="100%"

                    className="rounded-xl  w-full"
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                        },
                      },
                    }}
                  />
                ))}
              </div>
            )}

            {/* {cause.documents && cause.documents.length > 0 && (
              <div className="flex flex-col gap-4 pt-4">
                <h3 className="text-lg font-semibold">Supporting Documents</h3>
                <div className="">
                  {cause.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <PdfPreview pdfUrl={doc} />
                      <p className="text-sm text-center text-muted-foreground">
                        Document {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
          {!isMobile && (
            <div className="h-full sticky top-0 ">
              <AmountDetails cause={cause} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
