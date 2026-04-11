import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginPayload, type LoginResponse } from "@/api/auth";
import axiosInstance from "@/lib/axios";

export function useLogin() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    LoginResponse,
    Error,
    LoginPayload
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken, deviceId } = data.data;

      // Persist access token for page reload rehydration
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("deviceId", deviceId);

      // Attach to all future requests this session
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    },
  });

  return { login: mutate, isPending, isError, isSuccess, error, reset };
}
