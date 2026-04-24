import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginPayload, type LoginResponse } from "@/api/auth";
import axiosInstance from "@/lib/axios";
import { saveUser } from "@/lib/storage";

export type LoginOutcome =
  | { requiresTwoFactor: true; sessionKey: string }
  | { requiresTwoFactor: false };

export function useLogin() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    LoginResponse,
    Error,
    LoginPayload,
    unknown
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 2FA required — don't persist anything yet, caller handles redirect
      if (data.data.requiresTwoFactor) return;

      const { accessToken, deviceId, user } = data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("deviceId", deviceId);
      saveUser({
        id: user.id,
        username: user.username,
        email: user.email,
        autoCopy: user.autoCopy,
        twoFactorEnabled: user.twoFactorEnabled,
      });

      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    },
  });

  return { login: mutate, isPending, isError, isSuccess, error, reset };
}
