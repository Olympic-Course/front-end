// src/hooks/user/useUserLikedGet.ts
"use client";

import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { getUserLikedList } from "@/api/user";
import type { UserLikedCourse } from "@/types/user";

export interface GetUserLikedListResponse {
  courses: UserLikedCourse[];
  nextCursor: number | null;
  isLast: boolean;
}

export default function useUserLikedGet(tags: string[] = [], keyword?: string) {
  return useInfiniteQuery<
    GetUserLikedListResponse,   // queryFn 반환 타입
    Error,                      // error 타입
    InfiniteData<GetUserLikedListResponse>, // 최종 pages 타입
    [string, { tags: string[]; keyword?: string }], // queryKey 타입
    number | null               // pageParam 타입
  >({
    queryKey: ["userLiked", { tags, keyword }],

    queryFn: ({ pageParam = null }) =>
      getUserLikedList(keyword, tags, pageParam),

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor,
  });
}
