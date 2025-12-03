// src/api/user.ts
import api from "@/libs/AxiosInstance"
import { ApiResponse } from "@/types/api";
import { CheckDuplicateRequest } from "@/types/user"

export type CheckDuplicateResponse = ApiResponse<null>;

export async function checkDuplicate(data: CheckDuplicateRequest) {
  const res = await api.post<CheckDuplicateResponse>("/api/users/check", data);
  return res.data;
}
