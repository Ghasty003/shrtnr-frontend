// useLinkCountries.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLinkCountries } from "@/api/url";

export function useLinkCountries(slug: string) {
  return useQuery({
    queryKey: ["link-countries", slug],
    queryFn: () => fetchLinkCountries(slug),
    enabled: !!slug,
  });
}
