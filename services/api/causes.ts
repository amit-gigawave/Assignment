import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { CauseSearchType, DonationRequestType } from "@/models/schema";

export const createCause = async (cause: DonationRequestType) => {
  try {
    const response = await apiInstance.post(apiEndpoints.causes.createCause, {
      ...cause,
    });
    console.log({ response });
    if (response.status === StatusCode.CREATED) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getCategories = async (): Promise<
  {
    name: string;
    id: string;
  }[]
> => {
  try {
    const response = await apiInstance.get(apiEndpoints.causes.getCategories);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getAllCauses = async (): Promise<CauseSearchType[]> => {
  try {
    const response = await apiInstance.get(apiEndpoints.causes.causeSearch);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getCauseById = async (id: string) => {
  if (!id) return {};
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.causes.getCauseById}/${id}`
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

export const getMostDonatedCauses = async (): Promise<CauseSearchType[]> => {
  try {
    const response = await apiInstance.get(apiEndpoints.causes.mostDonated);
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response.data;
    }
    throw response;
  } catch (error) {
    throw handleErr(error);
  }
};
