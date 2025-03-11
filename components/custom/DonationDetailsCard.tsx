import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { IndianRupee, Calendar, CreditCard, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type DonationDetailsProps = {
  causeDetails: {
    id: string;
    title: string;
    amount: string;
    fundRaised: number | null;
    totalDonations: number;
    status: string;
    deadline: string;
  };
  transactions: Array<{
    id: string;
    causeId: string;
    isAnonomous: boolean;
    paymentId: string | null;
    amount: string;
    paymentMethod: string;
    receipt: string | null;
    isGateway: boolean;
    paymentOn: string | null;
    paymentstatus: string;
    settlementStatus: string;
    createdAt: string;
    updatedAt: string | null;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }>;
};

export const DonationDetailsCard = ({ causeDetails, transactions }: DonationDetailsProps) => {
  return (
    <Card className="border-none shadow-none bg-white rounded-2xl overflow-hidden">
      <CardHeader className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{causeDetails.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(causeDetails.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-700 flex items-center justify-end">
              <IndianRupee className="h-5 w-5" />
              {formatCurrency(Number(causeDetails.amount))}
            </div>
            <span className="text-sm text-muted-foreground">
              Total Amount
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gray-50 rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  {!transaction.isAnonomous && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span className="text-sm">
                        {transaction.user.firstName} {transaction.user.lastName}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-xs font-mono">
                      ID: {transaction.paymentId || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 flex items-center justify-end">
                    <IndianRupee className="h-4 w-4" />
                    {formatCurrency(Number(transaction.amount))}
                  </div>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                    {transaction.paymentstatus}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{transaction.paymentMethod}</span>
                <span>
                  {transaction.paymentOn
                    ? new Date(transaction.paymentOn).toLocaleDateString()
                    : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};