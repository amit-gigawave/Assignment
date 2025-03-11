import { apiEndpoints, StatusCode } from "@/constants/api";
import { CauseStatus, PaymentStatus } from "@/constants/enums";
import { apiInstance, handleErr } from "@/lib/utils";
import {
  CauseSearchType,
  DonationRecieptType,
  DonationType,
  TransactionListType,
  UserAuthType,
} from "@/models/schema";

export const userDonations = async (): Promise<DonationRecieptType[]> => {
  try {
    const response = await apiInstance.get(apiEndpoints.user.donationList);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const userCauseRequest = async (): Promise<CauseSearchType[]> => {
  try {
    const response = await apiInstance.get(apiEndpoints.user.causeList);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const submitDonation = async (data: DonationType) => {
  try {
    const response = await apiInstance.post(apiEndpoints.user.submit, {
      ...data,
    });
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getUserInfo = async (): Promise<UserAuthType> => {
  try {
    const response = await apiInstance.get(apiEndpoints.user.getUser);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getTransactions = async (
  causeId: string
): Promise<TransactionListType> => {
  try {
    const response = await apiInstance.get(
      apiEndpoints.user.transactions.replace(":causeId", causeId)
    );
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const manageCampaign = async (causeId: string, status: CauseStatus) => {
  try {
    const response = await apiInstance.get(
      apiEndpoints.user.manageCampaign.replace(":causeId", causeId) +
        `?status=${status}`
    );
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const updatePaymentStatus = async (data: {
  causeId: string;
  donationId: string;
  status: PaymentStatus;
}) => {
  try {
    const response = await apiInstance.post(
      apiEndpoints.user.updatePaymentStatus.replace(":causeId", data.causeId),
      {
        donationId: data.donationId,
        paymentStatus: data.status,
      }
    );
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};
