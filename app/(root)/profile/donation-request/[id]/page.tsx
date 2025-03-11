"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import CustomHeader from "@/components/custom/CustomHeader";
import CustomLoader from "@/components/custom/CustomLoader";
import TransactionList from "./components/TransactionList";
import { formatCurrency } from "@/lib/utils";

import { CustomButton } from "@/components/custom/CustomButtons";
import {
  useGetTransactionsQuery,
  useManageCampaignMutation,
} from "@/services/query/userQuery";
import { CauseStatus } from "@/constants/enums";

export const runtime = "edge";

const Page = () => {
  const { id } = useParams();
  const { data, isPending } = useGetTransactionsQuery(id as string);
  const { mutate: stopCampaign, isPending: campaignStatusLoading } =
    useManageCampaignMutation();
  const router = useRouter();
  // const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <section className="py-12 pt-20 min-h-screen">
      <CustomHeader title="Donation Request Details" />

      {isPending ? (
        <CustomLoader />
      ) : (
        <>
          {!!data && (
            <Card className="bg-transparent  border-none shadow-none w-fit mx-auto ">
              <CardContent className="p-6 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-gray-900 text-left mb-4">
                    {data.causeDetails.title}
                  </h3>
                  <CustomButton
                    size={"sm"}
                    btnVariant="dark"
                    className="gap-2 shadow-sm hover:shadow-md h-9 text-sm px-3"
                    onClick={() =>
                      router.push(
                        `/profile/donation-request/save?id=${data.causeDetails.id}`
                      )
                    }
                  >
                    Edit Details
                  </CustomButton>
                </div>

                <div className="flex flex-wrap gap-4 [&>div]:w-[250px]  justify-center">
                  {/* <div className="bg-muted/50 p-4 rounded-xl border space-y-2 text-left bg-white">
                    <p className="text-sm text-muted-foreground">Categories</p>
                    <div className="flex flex-wrap gap-2 text-lg">
                      {data.causeDetails.categories.map((category: string) => (
                        <span key={category} className="font-semibold ">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  <div className="bg-muted/50 p-4 rounded-xl border  gap-4 space-y-2 text-left bg-white">
                    <p className="text-sm text-muted-foreground">
                      Campaign Deadline
                    </p>
                    <p className="font-semibold text-lg">
                      {new Date(data.causeDetails.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border space-y-2 gap-4 text-left bg-white">
                    <p className="text-sm text-muted-foreground">
                      Requested Amount
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(data.causeDetails.amount)}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-xl border space-y-2 gap-4 text-left bg-white">
                    <p className="text-sm text-muted-foreground">
                      Raised Amount
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(data!.causeDetails!.fundRaised || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-4 sm:mx-auto ">
            <CustomButton
              variant="outline"
              className="h-9 text-sm rounded-lg px-4 flex-1"
              onClick={() => router.push(`/causes/${data!.causeDetails.id}`)}
            >
              View Campaign Page
            </CustomButton>

            <CustomButton
              btnVariant="outlined"
              className="h-9 text-sm rounded-lg px-2 flex-1"
              disabled={
                data!.causeDetails.status === CauseStatus.STOPPED ||
                campaignStatusLoading
              }
              onClick={() => {
                stopCampaign({
                  causeId: data!.causeDetails.id,
                  status: CauseStatus.STOPPED,
                });
              }}
            >
              Stop Campaign
            </CustomButton>

            {/* <AlertDialog
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  Delete Campaign
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your campaign and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={() => {
                      // Add delete mutation here
                      console.log("Delete confirmed");
                    }}
                  >
                    Delete Campaign
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
          </div>
          {!!data?.transactions && (
            <div className="mt-12 max-w-4xl mx-auto px-4">
              <h3 className="text-2xl font-bold text-center mb-7">
                Transactions
              </h3>
              <TransactionList
                donations={data?.transactions}
                causeId={id as string}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Page;
