// src/hooks/course/useCourseDelete.ts
"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "@/api/course";

export function useCourseDelete() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      // 삭제 성공 → 코스 목록 페이지로 이동
      router.replace("/courses");
    },
  });

  return {
    deleteCourse: mutation.mutate,
    isPending: mutation.isPending,
  };
}