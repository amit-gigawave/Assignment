"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { TransactionType } from "@/models/schema";
import { Mail, Phone, FileText, ExternalLink, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { CustomBadge } from "@/components/custom/CustomBadge";
import { PaymentStatus } from "@/constants/enums";
import { CustomButton } from "@/components/custom/CustomButtons";

export const TransactionCard = ({
  donation,
  onClickAction,
}: {
  donation: TransactionType;
  onClickAction: (donationId: string, status: PaymentStatus) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // // Helper function to determine status color
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "REQUESTED":
  //       return "bg-amber-500 hover:bg-amber-600";
  //     case "COMPLETED":
  //       return "bg-emerald-500 hover:bg-emerald-600";
  //     default:
  //       return "bg-slate-500 hover:bg-slate-600";
  //   }
  // };

  // // Get user initials for avatar
  // const getUserInitials = () => {
  //   if (!donation.user || donation.isAnonomous) return "AN";
  //   return `${donation.user.firstName?.[0] || ""}${
  //     donation.user.lastName?.[0] || ""
  //   }`;
  // };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Pending";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <Card className="overflow-hidden transition-all shadow-none border">
        <CardContent className="p-0">
          <div className="p-4 space-y-4">
            {/* Header with amount and status */}
            <div className="flex items-center justify-between text-lg font-medium ">
              <p className="text-sm font-medium">
                {donation.isAnonomous
                  ? "Anonymous"
                  : donation.user?.firstName + " " + donation.user?.lastName}
              </p>
              <span className="text-emerald-600">
                {formatCurrency(Number(donation.amount))}
              </span>
            </div>

            {/* User information */}

            {/* Footer with date and payment method */}
            <div className="flex justify-between items-end text-xs text-muted-foreground">
              <div className="flex flex-col gap-3">
                <div>
                  Payment Status :{" "}
                  <CustomBadge
                    variant={donation.paymentstatus as PaymentStatus}
                  />
                </div>
                {donation.paymentstatus === PaymentStatus.SUCCESS && (
                  <div>
                    Settlement Status :{" "}
                    <CustomBadge variant={PaymentStatus.SUCCESS} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal">
                  {donation.paymentMethod}
                </Badge>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    {isOpen ? "Less" : "More"}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>

          {/* Collapsible details section */}
          <CollapsibleContent>
            <Separator />
            <div className="p-4 bg-muted/30 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Transaction Details
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">ID:</span>
                      <span className="text-xs font-mono">
                        {donation.id.substring(0, 8)}...
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Created:
                      </span>
                      <span className="text-xs">
                        {formatDate(donation.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Updated:
                      </span>
                      <span className="text-xs">
                        {formatDate(donation.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Gateway:
                      </span>
                      <span className="text-xs">
                        {donation.isGateway ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                {!donation.isAnonomous && donation.user && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Contact Information
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">
                          {donation.user.firstName} {donation.user.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs line-clamp-1">
                          {donation.user.email}
                        </span>
                      </div>
                      {donation.user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{donation.user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {donation.receipt && (
                <div
                  className={cn([
                    "pt-1 grid grid-cols-1 max-w-sm mx-auto items-center gap-5",
                    // donation.paymentstatus !== PaymentStatus.SUCCESS &&
                    //   donation.paymentstatus !== PaymentStatus.INVALID &&
                    "sm:grid-cols-3 max-w-full",
                  ])}
                >
                  <CustomButton
                    btnVariant="outlined"
                    className="w-full flex items-center hover:text-black !h-8 px-4"
                  >
                    <a
                      href={donation.receipt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm"
                    >
                      <FileText className="size-2 mr-2" />
                      View Receipt
                      <ExternalLink className="size-2 ml-2" />
                    </a>
                  </CustomButton>
                  {/* {donation.paymentstatus !== PaymentStatus.SUCCESS &&
                    donation.paymentstatus !== PaymentStatus.INVALID && ( */}
                  <>
                    <Button
                      variant={"destructive"}
                      className="w-full text-sm !h-8 rounded-full"
                      onClick={() => {
                        onClickAction(donation.id, PaymentStatus.INVALID);
                      }}
                    >
                      Reject Payment
                    </Button>
                    <CustomButton
                      btnVariant="default"
                      className="w-full text-sm !h-8 px-4"
                      onClick={() => {
                        onClickAction(donation.id, PaymentStatus.SUCCESS);
                      }}
                    >
                      Acknowledge Payment
                    </CustomButton>
                  </>
                  {/* )} */}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
