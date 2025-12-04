// src/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { useUserStore } from "@/store/userStore";

export function useLogout() {
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Zustand에서 유저 정보 초기화
      clearUser();
    },
    onError: (err) => {
      console.error("로그아웃 실패:", err);
    },
  });
}