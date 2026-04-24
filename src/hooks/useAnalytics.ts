import { useQuery } from "@tanstack/react-query";
import {
  fetchAnalyticsStats,
  fetchAnalyticsClicks,
  fetchAnalyticsTopLinks,
  fetchAnalyticsCountries,
  fetchAnalyticsReferrers,
  fetchAnalyticsDevices,
  type AnalyticsRange,
} from "@/api/analytics";

export function useAnalyticsStats(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-stats", range],
    queryFn: () => fetchAnalyticsStats(range),
  });
}

export function useAnalyticsClicks(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-clicks", range],
    queryFn: () => fetchAnalyticsClicks(range),
  });
}

export function useAnalyticsTopLinks(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-top-links", range],
    queryFn: () => fetchAnalyticsTopLinks(range),
  });
}

export function useAnalyticsCountries(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-countries", range],
    queryFn: () => fetchAnalyticsCountries(range),
  });
}

export function useAnalyticsReferrers(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-referrers", range],
    queryFn: () => fetchAnalyticsReferrers(range),
  });
}

export function useAnalyticsDevices(range: AnalyticsRange) {
  return useQuery({
    queryKey: ["analytics-devices", range],
    queryFn: () => fetchAnalyticsDevices(range),
  });
}
