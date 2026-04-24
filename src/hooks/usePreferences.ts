import { useMutation } from "@tanstack/react-query";
import {
  updatePreferences,
  type UpdatePreferencesPayload,
} from "@/api/profile";
import { getUser, saveUser } from "@/lib/storage";

export function useUpdatePreferences() {
  return useMutation({
    mutationFn: (payload: UpdatePreferencesPayload) =>
      updatePreferences(payload),
    onSuccess: (data) => {
      const user = getUser();
      if (user) saveUser({ ...user, autoCopy: data.data.autoCopy });
    },
  });
}
