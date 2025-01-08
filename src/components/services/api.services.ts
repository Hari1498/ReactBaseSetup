import { UserLogin } from "../utils/commonModels/ModelInterface";
import { LocalStorageUtil } from "../utils/LocalStorageUtils";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorResponse {
  message: string;
  statusMessage?: string;
}

const baseURL = `${import.meta.env.VITE_API_URL}`;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Helper function to handle success responses
const handleSuccessResponse = (response: any) => {
  const successMessage =
    response?.data.data || response?.data?.data?.statusMessage;
  if (successMessage) {
    toast.success(successMessage);
  }
};

// Handle other errors
const handleOtherErrors = (error: AxiosError) => {
  const errorMessage =
    typeof error?.response?.data == "string"
      ? error.response.data
      : (error.response?.data as ErrorResponse)?.message || error.message;
  toast.error(errorMessage);
};

const handleLoadingIndicator = (action: "add" | "remove") => {
  document.body.classList[action]("loading-indicator");
};

// Function to refresh the token
const refreshToken = async (): Promise<string | null> => {
  try {
    const tokenData = LocalStorageUtil.getItem<UserLogin>("userLogin");
    if (tokenData?.refreshToken) {
      const response = await axios.post(`${baseURL}auth-service/auth/refresh`, {
        refreshToken: tokenData.refreshToken,
      });
      const newTokenData = response.data as UserLogin;

      // Update the token in local storage
      LocalStorageUtil.setItem("userLogin", newTokenData);

      return newTokenData.token;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

instance.interceptors.request.use(
  (config: any) => {
    handleLoadingIndicator("add");
    const token = LocalStorageUtil.getItem<UserLogin>("userLogin");

    if (
      token &&
      !["/login", "/auth/refresh"].some((url) => config.url?.includes(url))
    ) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  async (error: AxiosError) => {
    handleLoadingIndicator("remove");
    handleOtherErrors(error);
    // const errorMessage ="something went wrong";
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse<ErrorResponse>) => {
    setTimeout(() => handleLoadingIndicator("remove"), 500);

    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    handleLoadingIndicator("remove");
    const originalRequest = error.config;
    if (
      error.response?.status === 500 &&
      error.response?.data?.statusMessage === "Access Token has expired"
    ) {
      const newToken = await refreshToken();

      if (newToken && originalRequest) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } else {
        toast.error("Session expired. Please log in again.");
        LocalStorageUtil.clear();
        window.location.href = "/login";
        window.location.reload();
      }
    }
    handleOtherErrors(error);
    return Promise.reject(error);
  }
);

export const apiGet = async (url: string) => instance.get(url);
export const apiGetWithBody = async (url: string, data: any) =>
  instance.get(url, data);
export const apiPost = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
) => {
  if (data instanceof FormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }
  const response = await instance.post(url, data, config);
  if (!response.config.url?.includes("auth/refresh")) {
    handleSuccessResponse(response);
  }

  return response;
};
export const apiPut = async (url: string, data: any) => {
  const response = await instance.put(url, data);
  handleSuccessResponse(response);
  return response;
};
export const apiDelete = async (url: string) => {
  try {
    const response = await instance.delete(url);
    toast.success("Successfully deleted the record!");
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      handleOtherErrors(error);
    } else {
      toast.error("An unexpected error occurred while deleting the record.");
    }
    return Promise.reject(error);
  }
};

export default instance;
