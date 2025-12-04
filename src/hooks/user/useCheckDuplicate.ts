import { useMutation } from "@tanstack/react-query";
import { checkDuplicate } from "@/api/user";
import { CheckDuplicateRequest } from "@/types/user"

export function useCheckDuplicate() {
  return useMutation({
    mutationFn: (payload: CheckDuplicateRequest) => checkDuplicate(payload),
  });
}