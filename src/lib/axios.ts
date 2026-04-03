import axios, { AxiosError, type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

//  Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Unwrap the backend error message if it exists, otherwise fall back
    // to a generic message so call sites never have to do this themselves
    const message =
      (error.response?.data as Record<string, string>)?.message ??
      error.message ??
      "An unexpected error occurred.";

    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
