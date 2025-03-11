import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";

export const uploadBlog = async (file: any): Promise<any> => {
  try {
    const response = await apiInstance.post(
      apiEndpoints.base.blob,
      {
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log({ response });
    if (response.status === StatusCode.OK) {
      return response;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
