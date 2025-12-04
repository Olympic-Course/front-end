// src/hooks/course/usePresignedUrl.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { getPresignedUrl } from "@/api/course";

export function usePresignedUrl() {
  return useMutation({
    mutationFn: (ext: string) => getPresignedUrl(ext),
  });
}
