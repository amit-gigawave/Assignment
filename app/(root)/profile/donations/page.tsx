"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import CustomHeader from "@/components/custom/CustomHeader";
import { useUserDonationsQuery } from "@/services/query/userQuery";
import CustomLoader from "@/components/custom/CustomLoader";
import { formatCurrency } from "@/lib/utils";
import { CustomButton } from "@/components/custom/CustomButtons";

export const runtime = "edge";

const DonationsPage = () => {
  const { data, isPending } = useUserDonationsQuery();

  return (
    <section className="p-3 sm:p-5 !pt-16 min-h-screen">
      <CustomHeader title="Your Donations" />
      <div
        key={1}
        className=" flex-1 overflow-y-auto pb-4 rounded-t-xl mt-5 flex flex-wrap gap-y-5  items-center max-w-5xl mx-auto"
      >
        {isPending && <CustomLoader />}
        {!data ||
          (data?.length === 0 && (
            <p className="h-screen flex items-center justify-center w-full">
              No Donations Found
            </p>
          ))}
        {data?.map((donation) => (
          <Card
            key={donation.id}
            className="  transition-all duration-300 bg-white !shadow-none rounded-2xl !w-[28rem] mx-auto"
          >
            <CardContent className="p-6 shadow-none space-y-4 ">
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold text-black">{donation.title}</p>
                <h3 className="text-xl font-bold text-green-700 flex items-center">
                  {formatCurrency(donation.amount)}
                </h3>
              </div>

              <div className="flex items-center gap-4 justify-center ">
                <CustomButton btnVariant="outlined">
                  <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  Download Receipt
                </CustomButton>
                <CustomButton>View Cause</CustomButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DonationsPage;
