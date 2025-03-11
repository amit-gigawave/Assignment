"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/custom/CustomButtons";
import CustomHeader from "@/components/custom/CustomHeader";
import { Progress } from "@/components/ui/progress";
import { useUserCausesQuery } from "@/services/query/userQuery";
import CustomLoader from "@/components/custom/CustomLoader";
import type { CauseSearchType } from "@/models/schema";
import Image from "next/image";

export const runtime = "edge";

export default function DonationRequestsPage() {
  const router = useRouter();
  const { data, isPending } = useUserCausesQuery();

  const daysRemaining = (deadline: Date) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const days = Math.ceil(
      (deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return isNaN(days) ? 0 : days;
  };

  return (
    <section className="p-3 sm:p-5 !pt-16 flex flex-col space-y-6 min-h-screen">
      <CustomHeader title="Donation Requests" />
      <Link href="/profile/donation-request/save" className="self-center">
        <CustomButton className="text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Donation Request
        </CustomButton>
      </Link>
      {isPending && <CustomLoader />}
      {(!data || data?.length === 0) && !isPending && (
        <p className="text-center text-gray-500">No donation requests found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((cause: CauseSearchType) => {
          const progressPercentage = (cause.fundRaised / cause.amount) * 100;
          return (
            <Card
              key={cause.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl border-none bg-gray-50"
              onClick={() =>
                router.push(`/profile/donation-request/${cause.id}`)
              }
            >
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                  {cause.title}
                </h2>
                {cause.images[0] && (
                  <Image
                    src={cause.images[0]}
                    alt={cause.title}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Raised: ₹{cause.fundRaised.toLocaleString()}</span>
                  <span>Goal: ₹{cause.amount.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock
                      size={16}
                      className={
                        daysRemaining(cause.deadline) <= 7
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        daysRemaining(cause.deadline) <= 7
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {daysRemaining(cause.deadline)} days left
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {cause.totalDonations} donations
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
