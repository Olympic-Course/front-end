// src/api/user.ts
import api from "@/libs/AxiosInstance"
import { ApiResponse } from "@/types/api";

export type CheckType = "email" | "nickname";

export interface CheckDuplicateRequest {
  type: CheckType;
  content: string;
}

export type CheckDuplicateResponse = ApiResponse<null>;

export async function checkDuplicate(data: CheckDuplicateRequest) {
  const res = await api.post<CheckDuplicateResponse>("/api/users/check", data);
  return res.data;
}
