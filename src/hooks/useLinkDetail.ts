import { useQuery } from "@tanstack/react-query";
import { fetchLinkDetail } from "@/api/url";

export function useLinkDetail(slug: string) {
  return useQuery({
    queryKey: ["link-detail", slug],
    queryFn: () => fetchLinkDetail(slug),
    enabled: !!slug,
  });
}
