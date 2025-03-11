import { create } from "zustand";

type State = {
  isOtpSent: boolean;
  isOtpVerified: boolean;
  phoneNumber: string;
};

type Action = {
  setIsOtpSent: (isOtpSent: boolean) => void;
  setIsOtpVerified: (isOtpVerified: boolean) => void;
  setPhoneNumber: (phoneNumber: string) => void;
};

const initialState: State = {
  isOtpSent: false,
  isOtpVerified: false,
  phoneNumber: "",
};

export const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  setIsOtpSent: (isOtpSent) => set({ isOtpSent }),
  setIsOtpVerified: (isOtpVerified) => set({ isOtpVerified }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));
