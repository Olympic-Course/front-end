"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventList } from "@/api/home";

export function useEventListGet(date: string) {
  return useQuery({
    queryKey: ["eventList", date], // 날짜 기반으로 캐싱
    queryFn: () => getEventList({ date }),
    enabled: !!date, // 날짜가 있을 때만 실행
  });
}
