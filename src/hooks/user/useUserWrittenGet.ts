"use client";

import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { getUserWrittenList } from "@/api/user";
import type { GetUserWrittenListResponse } from "@/types/user";

export default function useUserWrittenGet(
  visibility: string,
  tags: string[] = [],
  keyword?: string
) {
  return useInfiniteQuery<
    GetUserWrittenListResponse,          // page 반환 타입
    Error,
    InfiniteData<GetUserWrittenListResponse>, // 전체 pages 타입
    [string, { visibility: string; tags: string[]; keyword?: string }],
    number | null                        // pageParam 타입
  >({
    queryKey: ["userWritten", { visibility, tags, keyword }],

    queryFn: ({ pageParam = null }) =>
      getUserWrittenList(visibility, keyword, tags, pageParam),

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor,
  });
}
