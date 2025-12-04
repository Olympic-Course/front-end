// src/hooks/course/useCourseCreate.ts
import { useMutation } from "@tanstack/react-query";
import { createCourse } from "@/api/course";

export function useCourseCreate() {
  return useMutation({
    mutationFn: createCourse,
  });
}
