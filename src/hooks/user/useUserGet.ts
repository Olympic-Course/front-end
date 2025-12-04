// src/hooks/user/useUserGet.ts
import { useQuery } from "@tanstack/react-query";
import { userGet } from "@/api/user";

export function useUserGet(isLoggedIn: boolean) {
  return useQuery({
    queryKey: ["userMe"],
    queryFn: userGet,
    enabled: isLoggedIn,
    retry: 1,
  });
}