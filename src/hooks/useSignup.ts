import { useMutation } from "@tanstack/react-query";
import { signup, SignupRequest } from "@/api/auth";

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload),
  });
}