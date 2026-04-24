import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetch2FASetup,
  enable2FA,
  disable2FA,
  verify2FA,
  type Verify2FAPayload,
} from "@/api/twoFactor";
import axiosInstance from "@/lib/axios";
import { saveUser, getUser } from "@/lib/storage";

export function use2FASetup(enabled: boolean) {
  return useQuery({
    queryKey: ["2fa-setup"],
    queryFn: fetch2FASetup,
    enabled, // only fetch when the enrollment modal is open
    staleTime: Infinity, // QR doesn't change mid-session
  });
}

export function useEnable2FA() {
  return useMutation({
    mutationFn: (token: string) => enable2FA(token),
  });
}

export function useDisable2FA() {
  return useMutation({
    mutationFn: (token: string) => disable2FA(token),
    onSuccess: () => {
      const user = getUser();
      if (user) saveUser({ ...user, twoFactorEnabled: false });
    },
  });
}

export function useVerify2FA() {
  return useMutation({
    mutationFn: (payload: Verify2FAPayload) => verify2FA(payload),
    onSuccess: (data) => {
      const { accessToken, deviceId, user } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("deviceId", deviceId);
      saveUser(user);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    },
  });
}
