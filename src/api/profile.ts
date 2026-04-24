import axiosInstance, { authAxiosInstance } from "@/lib/axios";

export interface UpdateUsernamePayload {
  username: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  autoCopy: boolean;
  twoFactorEnabled: boolean;
}

export interface UpdateUsernameResponse {
  success: boolean;
  data: { user: UserProfile };
}

export async function updateUsername(payload: UpdateUsernamePayload) {
  const res = await axiosInstance.patch<UpdateUsernameResponse>(
    "/api/v1/profile/username",
    payload,
  );
  return res.data;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  data: { accessToken: string };
}

export async function changePassword(payload: ChangePasswordPayload) {
  const res = await authAxiosInstance.patch<ChangePasswordResponse>(
    "/api/v1/profile/password",
    payload,
  );
  return res.data;
}

export interface UpdatePreferencesPayload {
  autoCopy: boolean;
}

export interface UpdatePreferencesResponse {
  success: boolean;
  data: { id: number; autoCopy: boolean };
}

export async function updatePreferences(payload: UpdatePreferencesPayload) {
  const res = await axiosInstance.patch<UpdatePreferencesResponse>(
    "/api/v1/profile/preferences",
    payload,
  );
  return res.data;
}
