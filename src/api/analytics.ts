import axiosInstance from "@/lib/axios";

export type AnalyticsRange = "30d" | "90d" | "ytd";

export interface AccountStats {
  totalClicks: number;
  uniqueVisitors: number;
  avgCtr: number;
  activeLinks: number;
}

export interface ClicksOverTimePoint {
  date: string;
  direct: number;
  referred: number;
}

export interface TopLink {
  rank: number;
  short_code: string;
  long_url: string;
  created_at: string;
  clicks: number;
  delta: number;
  positive: boolean;
}

export interface CountryData {
  country: string;
  count: number;
  pct: number;
}

export interface ReferrerData {
  referrer: string | null;
  count: number;
  pct: number;
}

export interface DeviceData {
  device: string;
  count: number;
  pct: number;
}

const q = (range: AnalyticsRange) => `?range=${range}`;

export async function fetchAnalyticsStats(
  range: AnalyticsRange,
): Promise<AccountStats> {
  const res = await axiosInstance.get<{ data: AccountStats }>(
    `/api/v1/analytics/stats${q(range)}`,
  );
  return res.data.data;
}

export async function fetchAnalyticsClicks(
  range: AnalyticsRange,
): Promise<ClicksOverTimePoint[]> {
  const res = await axiosInstance.get<{ data: ClicksOverTimePoint[] }>(
    `/api/v1/analytics/clicks${q(range)}`,
  );
  return res.data.data;
}

export async function fetchAnalyticsTopLinks(
  range: AnalyticsRange,
): Promise<TopLink[]> {
  const res = await axiosInstance.get<{ data: TopLink[] }>(
    `/api/v1/analytics/top-links${q(range)}`,
  );
  return res.data.data;
}

export async function fetchAnalyticsCountries(
  range: AnalyticsRange,
): Promise<CountryData[]> {
  const res = await axiosInstance.get<{ data: CountryData[] }>(
    `/api/v1/analytics/countries${q(range)}`,
  );
  return res.data.data;
}

export async function fetchAnalyticsReferrers(
  range: AnalyticsRange,
): Promise<ReferrerData[]> {
  const res = await axiosInstance.get<{ data: ReferrerData[] }>(
    `/api/v1/analytics/referrers${q(range)}`,
  );
  return res.data.data;
}

export async function fetchAnalyticsDevices(
  range: AnalyticsRange,
): Promise<DeviceData[]> {
  const res = await axiosInstance.get<{ data: DeviceData[] }>(
    `/api/v1/analytics/devices${q(range)}`,
  );
  return res.data.data;
}
