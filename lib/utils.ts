import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { type AxiosError } from "axios";
import { apiEndpoints } from "@/constants/api";
import { getToken } from "./serverCom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year
  return `${day}-${month}-${year}`; // Return formatted date
};

export const qKey = (input: string | string[]): string[] => {
  const splitStrings = (str: string): string[] =>
    str.split("/").filter(Boolean);
  if (typeof input === "string") {
    return splitStrings(input);
  } else {
    return input.reduce(
      (acc: string[], item) => acc.concat(splitStrings(item)),
      []
    );
  }
};

export function formatCurrency(amount: number, fraction?: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: fraction ?? 2,
  });
  return formatter.format(amount);
}

// export const formatDate = (date: Date) => {
//   return new Date(date).toLocaleDateString("en-US");
// };

export const formatTime = (time: Date): string => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0"); // Ensure hours are two digits
  const formattedMinutes = String(minutes).padStart(2, "0"); // Ensure minutes are two digits
  return `${formattedHours}:${formattedMinutes} ${ampm}`; // Return formatted time
};

export const apiInstance = axios.create({
  baseURL: "https://dk-api.kiranchowdarapu7.workers.dev",
  timeout: 1 * 60 * 1000,
  timeoutErrorMessage:
    "Unable to connect to our servers. please check your internet connection",
});

export let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
// Add request interceptor to add Authorization header
apiInstance.interceptors.request.use(
  (config) => {
    // const accessToken = getToken("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 errors
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint with credentials to include HTTP-only cookies
        const refreshToken = await getToken("refreshToken");

        const response = await apiInstance.get(apiEndpoints.auth.accessToken, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken: newToken } = response.data;

        // Store new access token
        // setCookie("accessToken", accessToken);
        accessToken = newToken;

        // Update Authorization header

        // Retry the original request
        return apiInstance(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        // localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export const handleErr = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const axiosError = e as AxiosError;
    const err = axiosError.response?.data;
    console.log("error message --> ", err);
    throw err;
  }
  throw e;
};

export const getIsLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");

  return !!accessToken;
};
