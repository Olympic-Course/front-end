// src/hooks/user/usePasswordCheck.ts
import { useMutation } from "@tanstack/react-query";
import { passwordCheck } from "@/api/user";
import { PasswordCheckRequest } from "@/types/user";

export function usePasswordCheck() {
  return useMutation({
    mutationFn: (payload: PasswordCheckRequest) => passwordCheck(payload),
  });
}
