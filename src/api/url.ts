import axiosInstance from "@/lib/axios";

export interface ShortUrl {
  id: number;
  long_url: string;
  short_code: string;
  status: "ACTIVE" | "DISABLED";
  expires_at: string | null;
  created_at: string;
  updated_at: string | null;
  _count?: { clicks: number };
}

export interface ShortenUrlResponse {
  success: boolean;
  message: string;
  data: ShortUrl;
}

export interface DashboardStats {
  totalLinks: number;
  totalClicks: number;
  clicksToday: number;
  mostClicked: {
    short_code: string;
    clicks: number;
    percentage: number;
  } | null;
}

export interface ActivityEntry {
  id: number;
  eventType: string;
  actorId: number | null;
  actorEmail: string | null;
  ip: string | null;
  meta: Record<string, unknown> | null;
  createdAt: string;
}

export interface PaginatedLinksResponse {
  data: ShortUrl[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export interface LinkStats {
  totalClicks: number;
  uniqueVisitors: number;
  avgRedirectTime: number;
  bounceRate: number;
}

export interface LinkDetail extends ShortUrl {
  stats: LinkStats;
}

export interface ClicksOverTimePoint {
  date: string;
  clicks: number;
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

export async function shortenUrl(payload: {
  long_url: string;
  alias?: string;
}): Promise<ShortenUrlResponse> {
  const res = await axiosInstance.post<ShortenUrlResponse>(
    "/api/v1/url/shorten",
    payload,
  );
  return res.data;
}

export async function fetchLinks(limit = 5): Promise<ShortUrl[]> {
  const res = await axiosInstance.get<{ data: ShortUrl[] }>(
    `/api/v1/url/links?limit=${limit}`,
  );
  return res.data.data;
}

export async function fetchStats(): Promise<DashboardStats> {
  const res = await axiosInstance.get<{ data: DashboardStats }>(
    "/api/v1/url/stats",
  );
  return res.data.data;
}

export async function fetchActivity(limit = 5): Promise<ActivityEntry[]> {
  const res = await axiosInstance.get<{ data: ActivityEntry[] }>(
    `/api/v1/url/activity?limit=${limit}`,
  );
  return res.data.data;
}

export async function fetchLinksPaginated(
  page: number,
  limit: number,
  filter: "ALL" | "ACTIVE" | "DISABLED",
): Promise<PaginatedLinksResponse> {
  const res = await axiosInstance.get<PaginatedLinksResponse>(
    `/api/v1/url/links/all?page=${page}&limit=${limit}&filter=${filter}`,
  );
  return res.data;
}

export async function fetchLinkDetail(slug: string): Promise<LinkDetail> {
  const res = await axiosInstance.get<{ data: LinkDetail }>(
    `/api/v1/url/links/${slug}`,
  );
  return res.data.data;
}

export async function fetchLinkClicks(
  slug: string,
  range: "7D" | "30D" | "90D",
): Promise<ClicksOverTimePoint[]> {
  const res = await axiosInstance.get<{ data: ClicksOverTimePoint[] }>(
    `/api/v1/url/links/${slug}/clicks?range=${range}`,
  );
  return res.data.data;
}

export async function fetchLinkCountries(slug: string): Promise<CountryData[]> {
  const res = await axiosInstance.get<{ data: CountryData[] }>(
    `/api/v1/url/links/${slug}/countries`,
  );
  return res.data.data;
}

export async function fetchLinkReferrers(
  slug: string,
): Promise<ReferrerData[]> {
  const res = await axiosInstance.get<{ data: ReferrerData[] }>(
    `/api/v1/url/links/${slug}/referrers`,
  );
  return res.data.data;
}

export async function fetchLinkDevices(slug: string): Promise<DeviceData[]> {
  const res = await axiosInstance.get<{ data: DeviceData[] }>(
    `/api/v1/url/links/${slug}/devices`,
  );
  return res.data.data;
}
