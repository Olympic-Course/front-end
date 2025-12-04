// src/hooks/user/useDeleteUser.ts
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/api/user";
import { useUserStore } from "@/store/userStore";

export function useDeleteUser() {
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => deleteUser(),

     onSuccess: () => {
      // Zustand 사용자 정보 초기화
      clearUser();

      // localStorage 초기화 (토큰 제거)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  });
}