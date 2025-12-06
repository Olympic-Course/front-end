"use client";

import { useInfiniteQuery, InfiniteData  } from "@tanstack/react-query";
import { getCourseList } from "@/api/course";
import type { GetCourseListResponse } from "@/types/course";

export default function useCourseListGet(tags: string[] = [], keyword?: string) {
  return useInfiniteQuery<
    GetCourseListResponse,     // queryFn 반환 타입 (각 페이지)
    Error,                     // error 타입
    InfiniteData<GetCourseListResponse>,     // 최종 select 반환 타입 (pages 구조 유지)
    any[],    // queryKey 타입
    number | null              // pageParam 타입
  >({
    queryKey: ["courseList", { tags, keyword }],
    queryFn: ({ pageParam = null }) =>
      getCourseList({
        tag: tags,
        keyword,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.isLast ? undefined : lastPage.data.nextCursor,
  });
}
