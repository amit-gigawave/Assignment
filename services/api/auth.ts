import { loginType } from "@/app/(auth)/login/components/Login";
import { apiEndpoints, StatusCode } from "@/constants/api";
import { auth } from "@/lib/firebase";
import { setCookie } from "@/lib/serverCom";
import { apiInstance, handleErr, setAccessToken } from "@/lib/utils";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { cookies } from "next/headers";

export const signInWithGoogle = async (data: loginType) => {
  try {
    const response = await apiInstance.post(
      apiEndpoints.auth.signInWithGoogle,
      {
        ...data,
      }
    );
    console.log({ response });
    if (response.status === StatusCode.OK) {
      // Store the access token from response
      const accessToken = response.data.accessToken;
      setAccessToken(accessToken);
      const refreshToken = response.data.refreshToken;
      setCookie("refreshToken", refreshToken);

      return response.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
