import type { UserProfile } from "@/api/profile";

export function saveUser(user: UserProfile) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): UserProfile | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("deviceId");
  localStorage.removeItem("user");
}
