import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInWithGoogle } from "../api/auth";
import { apiEndpoints } from "@/constants/api";
import { loginType } from "@/app/(auth)/login/components/Login";

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationKey: [apiEndpoints.auth.signInWithGoogle],
    mutationFn: async (data: loginType) => await signInWithGoogle(data),
    onSuccess: async (data) => {
      console.log({ data });
      toast.success("Login Successfuly!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log({ error });
      //TODO: Error Handling
      toast.error(error.message ?? "Invalid Credentials");
    },
  });
};
