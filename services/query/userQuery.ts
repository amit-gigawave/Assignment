import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions,
  getUserInfo,
  manageCampaign,
  submitDonation,
  updatePaymentStatus,
  userCauseRequest,
  userDonations,
} from "../api/user";
import {
  CauseSearchType,
  DonationRecieptType,
  DonationType,
  TransactionListType,
} from "@/models/schema";
import { toast } from "sonner";
import { CauseStatus, PaymentStatus } from "@/constants/enums";

export const useUserCausesQuery = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.user.causeList),
    queryFn: userCauseRequest,
  });
};

// export const getUserInfo = () => {
//     return useQuery({
//         queryKey: qKey(apiEndpoints.user),
//     })
// }

export const useSubmitDonationMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.submit),
    mutationFn: (data: DonationType) => submitDonation(data),
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Donation submitted successfully");
    },
  });
};

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.user.getUser),
    queryFn: getUserInfo,
  });
};

export const useGetTransactionsQuery = (causeId: string) => {
  return useQuery({
    queryKey: qKey(apiEndpoints.user.transactions.replace(":causeId", causeId)),
    queryFn: () => getTransactions(causeId),
  });
};

export const useManageCampaignMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.manageCampaign),
    mutationFn: (data: { causeId: string; status: CauseStatus }) =>
      manageCampaign(data.causeId, data.status),
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Campaign stopped successfully");
    },
  });
};

export const useUserDonationsQuery = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.user.donationList),
    queryFn: userDonations,
  });
};

export const useUpdatePaymentStatusMutation = () => {
  useUserCausesQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: qKey(apiEndpoints.user.updatePaymentStatus),
    mutationFn: (data: {
      donationId: string;
      causeId: string;
      status: PaymentStatus;
    }) => updatePaymentStatus(data),
    onSuccess: (data, variables) => {
      console.log({ data });

      const { status, causeId, donationId } = variables;

      const causeList = queryClient.getQueryData(
        qKey(apiEndpoints.user.causeList)
      ) as CauseSearchType[];

      const transactions = queryClient.getQueryData(
        qKey(apiEndpoints.user.transactions.replace(":causeId", causeId))
      ) as TransactionListType;

      console.log({ causeList, transactions });
      const causeIndex = causeList.findIndex((c) => c.id === causeId);
      const transactionIndex = transactions.transactions.findIndex(
        (t) => t.id === donationId
      );
      if (causeIndex === -1 || transactionIndex === -1) {
        console.log("Cause or transaction not found");
        return;
      }
      if (status === PaymentStatus.SUCCESS) {
        // Early return if indexes are not found

        const amount = transactions.transactions[transactionIndex].amount;

        // Update cause list
        causeList[causeIndex].fundRaised += amount;
        causeList[causeIndex].totalDonations += 1;

        // Update transactions
        transactions.causeDetails.totalDonations += 1;
        transactions.causeDetails.amount += amount;
        transactions.transactions[transactionIndex].paymentstatus = status;
        transactions.transactions[transactionIndex].settlementStatus = status;

        console.log({ causeIndex, transactionIndex });
        // Update query cache with proper invalidation
      } else {
        transactions.transactions[transactionIndex].paymentstatus = status;
        transactions.transactions[transactionIndex].settlementStatus = status;
      }
      queryClient.setQueryData(
        qKey(apiEndpoints.user.causeList),
        structuredClone(causeList)
      );
      queryClient.setQueryData(
        qKey(apiEndpoints.user.transactions.replace(":causeId", causeId)),
        structuredClone(transactions)
      );

      // Invalidate queries to ensure UI updates
      queryClient.invalidateQueries({
        queryKey: qKey(apiEndpoints.user.causeList),
      });
      queryClient.invalidateQueries({
        queryKey: qKey(
          apiEndpoints.user.transactions.replace(":causeId", causeId)
        ),
      });
    },
  });
};
