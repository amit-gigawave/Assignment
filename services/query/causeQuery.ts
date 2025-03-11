import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCause,
  getAllCauses,
  getCategories,
  getCauseById,
  getMostDonatedCauses,
} from "../api/causes";
import { DonationRequestType } from "@/models/schema";
import { apiEndpoints } from "@/constants/api";

export const useCreateCauseMutation = () => {
  return useMutation({
    mutationKey: [apiEndpoints.causes.createCause],
    mutationFn: (cause: DonationRequestType) => createCause(cause),
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });
};

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: [apiEndpoints.causes.getCategories],
    queryFn: () => getCategories(),
  });
};

export const useGetAllCauses = () => {
  return useQuery({
    queryKey: [apiEndpoints.causes.getCauses],
    queryFn: () => getAllCauses(),
  });
};

export const useGetCauseByID = (causeId: string) => {
  return useQuery({
    queryKey: [apiEndpoints.causes.getCauseById, causeId],
    queryFn: () => getCauseById(causeId),
  });
};

export const useMostDonatedCausesQuery = () => {
  return useQuery({
    queryKey: [apiEndpoints.causes.mostDonated],
    queryFn: () => getMostDonatedCauses(),
  });
};
