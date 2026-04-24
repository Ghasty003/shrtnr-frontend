import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  type ChangePasswordPayload,
  type ChangePasswordResponse,
} from "@/api/profile";
import axiosInstance from "@/lib/axios";

export function useChangePassword() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: changePassword,
    onSuccess: (data) => {
      const { accessToken } = data.data;

      // Refresh token is rotated via httpOnly cookie automatically.
      // Update the access token in localStorage and on the axios instance.
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    },
  });

  return {
    changePassword: mutate,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  };
}
