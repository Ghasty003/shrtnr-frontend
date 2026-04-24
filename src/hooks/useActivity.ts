import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/api/url";

export function useActivity(limit = 5) {
  return useQuery({
    queryKey: ["activity", limit],
    queryFn: () => fetchActivity(limit),
  });
}
