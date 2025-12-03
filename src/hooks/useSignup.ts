import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth";
import { SignupRequest } from "@/types/auth"

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload),
  });
}