import axiosInstance from "@/lib/axios";

export interface ShortUrl {
  id: string;
  long_url: string;
  short_code: string;
  created_at: string;
  updated_at: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  message: string;
  data: ShortUrl;
}

export interface ShortenUrlPayload {
  long_url: string;
}

// API Functions

export async function shortenUrl(
  payload: ShortenUrlPayload,
): Promise<ShortenUrlResponse> {
  const response = await axiosInstance.post<ShortenUrlResponse>(
    "/api/v1/shorten",
    payload,
  );
  return response.data;
}
