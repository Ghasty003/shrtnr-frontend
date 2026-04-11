import axiosInstance from "@/lib/axios";

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
  data: {
    accessToken: string;
    deviceId: string;
    user: { id: number; username: string; email: string };
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
  const res = await axiosInstance.post<LoginResponse>(
    "/api/v1/auth/login",
    payload,
  );
  return res.data;
}
