import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "@/api/url";

export function useLinks(limit = 5) {
  return useQuery({
    queryKey: ["links", limit],
    queryFn: () => fetchLinks(limit),
  });
}
