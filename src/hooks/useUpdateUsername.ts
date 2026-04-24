import { useMutation } from "@tanstack/react-query";
import {
  updateUsername,
  type UpdateUsernamePayload,
  type UpdateUsernameResponse,
} from "@/api/profile";
import { saveUser } from "@/lib/storage";

export function useUpdateUsername() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    UpdateUsernameResponse,
    Error,
    UpdateUsernamePayload
  >({
    mutationFn: updateUsername,
    onSuccess: (data) => {
      // Keep localStorage in sync so the updated username
      // is reflected on the next page load / rehydration
      saveUser(data.data.user);
    },
  });

  return {
    updateUsername: mutate,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  };
}
