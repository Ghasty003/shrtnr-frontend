import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser, logoutAllUser } from "@/api/auth";
import { clearAuth } from "@/lib/storage";
import axiosInstance from "@/lib/axios";

function cleanup(navigate: ReturnType<typeof useNavigate>) {
  clearAuth();
  delete axiosInstance.defaults.headers.common["Authorization"];
  navigate("/auth/login", { replace: true });
}

export function useLogout() {
  const navigate = useNavigate();

  const single = useMutation({
    mutationFn: logoutUser,
    onSettled: () => cleanup(navigate), // clear local state even if request fails
  });

  const all = useMutation({
    mutationFn: logoutAllUser,
    onSettled: () => cleanup(navigate),
  });

  return {
    logoutOne: single.mutate,
    logoutAll: all.mutate,
    isPending: single.isPending || all.isPending,
  };
}
