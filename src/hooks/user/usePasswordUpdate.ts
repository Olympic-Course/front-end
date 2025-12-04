// src/hooks/user/usePasswordUpdate.ts
import { useMutation } from "@tanstack/react-query";
import { passwordUpdate } from "@/api/user";
import { PasswordUpdateRequest } from "@/types/user";

export function usePasswordUpdate() {
  return useMutation({
    mutationFn: (payload: PasswordUpdateRequest) => passwordUpdate(payload),
  });
}
