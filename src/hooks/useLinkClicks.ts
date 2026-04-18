import { useQuery } from "@tanstack/react-query";
import { fetchLinkClicks } from "@/api/url";

export function useLinkClicks(slug: string, range: "7D" | "30D" | "90D") {
  return useQuery({
    queryKey: ["link-clicks", slug, range],
    queryFn: () => fetchLinkClicks(slug, range),
    enabled: !!slug,
  });
}
