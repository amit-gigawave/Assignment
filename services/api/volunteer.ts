import { apiEndpoints ,StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { VolunteerType } from "@/models/schema";


export const volunteerRequest = async (volunteer: VolunteerType ) => {
    try {
      const response = await apiInstance.post(apiEndpoints.volunteers.request, volunteer);
      console.log({ response });
      if (response.status === StatusCode.CREATED) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw handleErr(error);
    }
  };