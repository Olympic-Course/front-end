// src/hooks/home/useHomeGet.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/api/home";

export function useHomeGet() {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });
}
