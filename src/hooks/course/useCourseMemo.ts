"use client";

import { useMutation } from "@tanstack/react-query";
import { postCourseMemo } from "@/api/course";
import { useCourseNavigationStore } from "@/store/courseNavigationStore";
import { CourseMemoRequest } from "@/types/course";

export function useCourseMemo(courseId: number) {
  const { setNavigationData } = useCourseNavigationStore();

  return useMutation({
    mutationFn: (payload: CourseMemoRequest) =>
      postCourseMemo(courseId, payload),

    onSuccess: (res) => {
      // 🚀 안전하게 데이터 구조 확인
      if (!res?.data) {
        console.error("❌ 예상치 못한 응답 구조:", res);
        return;
      }

      const { userCourseId, userSteps } = res.data;

      if (!userCourseId || !Array.isArray(userSteps)) {
        console.error("❌ 응답 데이터에 필요한 정보가 없습니다:", res.data);
        return;
      }

      // 🚀 네비게이션 스토어 저장
      setNavigationData({
        userCourseId,
        userSteps,
      });

      console.log("📌 네비게이션 데이터 저장 완료:", {
        userCourseId,
        stepCount: userSteps.length,
      });
    },

    onError: (err) => {
      console.error("❌ 코스 메모하기 API 실패:", err);
    },
  });
}
