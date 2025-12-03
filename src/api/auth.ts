// src/api/auth.ts
import api from "@/libs/AxiosInstance"
import { ApiResponse } from "@/types/api";

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export type SignupResponse = ApiResponse<null>;

export async function signup(data: SignupRequest) {
  const res = await api.post<SignupResponse>("/api/users", data);
  return res.data;
}
