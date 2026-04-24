import axios, { type AxiosError, type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Only for /auth/refresh — needs to send the httpOnly cookie
export const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

export class RateLimitError extends Error {
  retryAfter: string;

  constructor(message: string, retryAfter: string) {
    super(message);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

function parseRetryAfter(error: AxiosError): string {
  const raw = error.response?.headers?.["retry-after"];
  const seconds = raw ? Math.ceil(Number(raw)) : 60;

  if (seconds >= 60) {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}

let isRefreshing = false;

// this stores all failed jobs when token expires
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

// this function is used to execute all failed job when token expires and trying to get new one
function flushQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

//  Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    // Rate limited — extract time remaining and surface it
    if (error.response?.status === 429) {
      const seconds = parseRetryAfter(error);
      console.log([seconds]);
      return Promise.reject(new RateLimitError("Too many requests.", seconds));
    }

    // Access token expired — attempt silent refresh
    const errorCode = (error.response?.data as Record<string, string>)?.code;
    if (
      error.response?.status === 401 &&
      errorCode === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      // If a refresh is already in flight, queue this request until it resolves
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers!["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await authAxiosInstance.post("/api/v1/auth/refresh");
        const newToken: string = data.data.accessToken;

        // Persist and re-attach for all future requests
        localStorage.setItem("accessToken", newToken);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        flushQueue(null, newToken);
        originalRequest.headers!["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is also expired — force logout
        flushQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        delete axiosInstance.defaults.headers.common["Authorization"];
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Unwrap the backend error message if it exists, otherwise fall back
    // to a generic message so call sites never have to do this themselves
    const message =
      (error.response?.data as Record<string, string>)?.message ??
      error.message ??
      "An unexpected error occurred.";

    return Promise.reject(new Error(message));
  },
);

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

authAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    // Rate limited — extract time remaining and surface it
    if (error.response?.status === 429) {
      const seconds = parseRetryAfter(error);
      console.log([seconds]);
      return Promise.reject(new RateLimitError("Too many requests.", seconds));
    }

    // Access token expired — attempt silent refresh
    const errorCode = (error.response?.data as Record<string, string>)?.code;
    if (
      error.response?.status === 401 &&
      errorCode === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      // If a refresh is already in flight, queue this request until it resolves
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers!["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await authAxiosInstance.post("/api/v1/auth/refresh");
        const newToken: string = data.data.accessToken;

        // Persist and re-attach for all future requests
        localStorage.setItem("accessToken", newToken);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        flushQueue(null, newToken);
        originalRequest.headers!["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is also expired — force logout
        flushQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        delete axiosInstance.defaults.headers.common["Authorization"];
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

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
