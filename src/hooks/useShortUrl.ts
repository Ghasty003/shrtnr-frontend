import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shortenUrl, type ShortenUrlResponse } from "@/api/url";

export function useShortUrl() {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, isSuccess, error, reset } =
    useMutation<ShortenUrlResponse, Error, { longUrl: string; alias?: string }>(
      {
        mutationFn: ({ longUrl, alias }) =>
          shortenUrl({ long_url: longUrl, alias: alias || undefined }),
        onSuccess: () => {
          // Refresh the links list and stats on the dashboard
          queryClient.invalidateQueries({ queryKey: ["links"] });
          queryClient.invalidateQueries({ queryKey: ["stats"] });
        },
      },
    );

  return {
    shorten: mutate,
    result: data?.data ?? null,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}
