import { useMutation } from "@tanstack/react-query";
import {
  verifyOtp,
  type VerifyOtpPayload,
  type VerifyOtpResponse,
} from "@/api/auth";

export function useVerifyOtp() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    VerifyOtpResponse,
    Error,
    VerifyOtpPayload
  >({
    mutationFn: verifyOtp,
  });

  return { verify: mutate, isPending, isError, isSuccess, error, reset };
}
