import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/api/url";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
}
