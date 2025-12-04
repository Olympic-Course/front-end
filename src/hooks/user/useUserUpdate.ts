// src/hooks/user/useUserUpdate.ts
import { useMutation } from "@tanstack/react-query";
import { userUpdate } from "@/api/user";
import { UserUpdateRequest } from "@/types/user";

export function useUserUpdate() {
  return useMutation({
    mutationFn: (payload: UserUpdateRequest) => userUpdate(payload),
  });
}
