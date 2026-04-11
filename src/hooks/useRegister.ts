import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  type RegisterPayload,
  type RegisterResponse,
} from "@/api/auth";

export function useRegister() {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation<
    RegisterResponse,
    Error,
    RegisterPayload
  >({
    mutationFn: registerUser,
  });

  return { register: mutate, isPending, isError, isSuccess, error, reset };
}
