// useLinkReferrers.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLinkReferrers } from "@/api/url";

export function useLinkReferrers(slug: string) {
  return useQuery({
    queryKey: ["link-referrers", slug],
    queryFn: () => fetchLinkReferrers(slug),
    enabled: !!slug,
  });
}
