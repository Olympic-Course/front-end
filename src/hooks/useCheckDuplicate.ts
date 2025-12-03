import { useMutation } from "@tanstack/react-query";
import { checkDuplicate, CheckDuplicateRequest } from "@/api/user";

export function useCheckDuplicate() {
  return useMutation({
    mutationFn: (payload: CheckDuplicateRequest) => checkDuplicate(payload),
  });
}