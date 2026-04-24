import axiosInstance, { authAxiosInstance } from "@/lib/axios";
import type { UserProfile } from "./profile";

export interface TwoFASetupData {
  qrDataUrl: string;
  secret: string;
}

export interface TwoFASetupResponse {
  success: boolean;
  data: TwoFASetupData;
}

export interface EnableTwoFAResponse {
  success: boolean;
  data: { recoveryCodes: string[] };
}

export interface Verify2FAPayload {
  sessionKey: string;
  token: string;
}

export interface Verify2FAResponse {
  success: boolean;
  data: {
    requiresTwoFactor: false;
    accessToken: string;
    deviceId: string;
    user: UserProfile;
  };
}

export async function fetch2FASetup() {
  const res = await axiosInstance.get<TwoFASetupResponse>("/api/v1/2fa/setup");
  return res.data;
}

export async function enable2FA(token: string) {
  const res = await axiosInstance.post<EnableTwoFAResponse>(
    "/api/v1/2fa/enable",
    { token },
  );
  return res.data;
}

export async function disable2FA(token: string) {
  const res = await axiosInstance.post("/api/v1/2fa/disable", { token });
  return res.data;
}

export async function verify2FA(payload: Verify2FAPayload) {
  // Needs withCredentials to receive the refreshToken cookie
  const res = await authAxiosInstance.post<Verify2FAResponse>(
    "/api/v1/2fa/verify",
    payload,
  );
  return res.data;
}
