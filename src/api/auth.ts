import axiosInstance, { authAxiosInstance } from "@/lib/axios";

// Types

export interface RegisterPayload {
  username: string;
  fullName?: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: { id: number; username: string; email: string };
}

export interface LoginPayload {
  email: string;
  password: string;
  deviceId?: string;
}

export interface LoginResponse {
  success: boolean;
  data:
    | {
        requiresTwoFactor: true;
        sessionKey: string;
      }
    | {
        requiresTwoFactor: false;
        accessToken: string;
        deviceId: string;
        user: {
          id: number;
          username: string;
          email: string;
          autoCopy: boolean;
          twoFactorEnabled: boolean;
        };
      };
}

// API functions

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await axiosInstance.post<RegisterResponse>(
    "/api/v1/auth/register",
    payload,
  );
  return res.data;
}

export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  const res = await axiosInstance.post<VerifyOtpResponse>(
    "/api/v1/auth/verify-otp",
    payload,
  );
  return res.data;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await authAxiosInstance.post<LoginResponse>(
    "/api/v1/auth/login",
    payload,
  );
  return res.data;
}

export async function logoutUser(): Promise<void> {
  // Needs withCredentials to send the httpOnly refresh token cookie so the
  // server can revoke it. Fire-and-forget — we clear local state regardless.
  await authAxiosInstance.post("/api/v1/auth/logout");
}

export async function logoutAllUser(): Promise<void> {
  await authAxiosInstance.post("/api/v1/auth/logout-all");
}
