import { useMutation } from "@tanstack/react-query";
import { shortenUrl, type ShortenUrlResponse } from "@/api/url";

export function useShortUrl() {
  const { mutate, data, isPending, isError, isSuccess, error, reset } =
    useMutation<ShortenUrlResponse, Error, string>({
      mutationFn: (longUrl: string) => shortenUrl({ long_url: longUrl }),
    });

  return {
    shorten: mutate, // call this with the raw URL string
    data, // full ShortenUrlResponse when successful
    result: data?.data ?? null, // the ShortUrl object, or null before first call
    isPending,
    isSuccess,
    isError,
    error, // typed as Error — message already unwrapped by axios interceptor
    reset, // clears state back to idle
  };
}
