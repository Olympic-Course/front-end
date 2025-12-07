// src/hooks/course/useCourseDetailGet.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseDetail } from "@/api/course";

export function useCourseDetailGet(courseId: number) {
  return useQuery({
    queryKey: ["courseDetail", courseId],
    queryFn: () => getCourseDetail(courseId),
    enabled: !!courseId, // courseId가 있을 때만 실행
  });
}
