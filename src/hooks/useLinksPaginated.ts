import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchLinksPaginated } from "@/api/url";

export function useLinksPaginated(
  page: number,
  limit: number,
  filter: "ALL" | "ACTIVE" | "DISABLED",
) {
  return useQuery({
    queryKey: ["links-paginated", page, limit, filter],
    queryFn: () => fetchLinksPaginated(page, limit, filter),
    placeholderData: keepPreviousData, // keeps old data visible while fetching next page
  });
}
