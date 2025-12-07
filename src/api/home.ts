// src/api/home.ts
import api from "@/libs/AxiosInstance";
import type { GetHomeResponse, EventData  } from "@/types/home";

// 홈 API
export async function getHome(): Promise<GetHomeResponse> {
  const res = await api.get<GetHomeResponse>("/api/home");
  return res.data;
}

// 공연 조회 API 파라미터
export interface EventListParams {
  date: string;
}

// 공연 조회 API 응답 타입
export interface EventListResponse {
  success: boolean;
  code: string;
  data: EventData;
}

// 공연 조회 API
export async function getEventList(params: EventListParams): Promise<EventListResponse> {
  const res = await api.get<EventListResponse>("/api/events", { params });
  return res.data;
}