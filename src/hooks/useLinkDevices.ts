// useLinkDevices.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLinkDevices } from "@/api/url";

export function useLinkDevices(slug: string) {
  return useQuery({
    queryKey: ["link-devices", slug],
    queryFn: () => fetchLinkDevices(slug),
    enabled: !!slug,
  });
}
