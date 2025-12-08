"use client";

import { useMutation } from "@tanstack/react-query";
import { updateCourseMemo } from "@/api/course";
import { useCourseNavigationStore } from "@/store/courseNavigationStore";
import { CourseMemoRequest } from "@/types/course";

export function useUpdateCourseMemo(courseId: number, userCourseId: number) {
  const { setNavigationData } = useCourseNavigationStore();

  return useMutation({
    mutationFn: (payload: CourseMemoRequest) =>
      updateCourseMemo(courseId, userCourseId, payload),

    onSuccess: (res) => {
      if (!res?.data) {
        console.error("❌ 예상치 못한 응답 구조:", res);
        return;
      }

      const { userCourseId, userSteps } = res.data;

      setNavigationData({
        userCourseId,
        userSteps,
      });

      console.log("📌 메모 수정 완료 & store 업데이트", res.data);
    },

    onError: (err) => {
      console.error("❌ 코스 메모 수정 실패:", err);
    },
  });
}
