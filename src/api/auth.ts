// src/api/auth.ts
import api from "@/libs/AxiosInstance"
import { ApiResponse } from "@/types/api";
import { SignupRequest, LoginRequest, LoginData } from "@/types/auth"

// 회원가입 API
export type SignupResponse = ApiResponse<null>;

export async function signup(data: SignupRequest) {
  const res = await api.post<SignupResponse>("/api/users", data);
  return res.data;
}

// 로그인 API
export type LoginResponse = ApiResponse<LoginData>;

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/api/auth/login", data);
  // 헤더에서 토큰 꺼내기
  const accessToken = res.headers["authorization"];
  const pureToken = accessToken.replace("Bearer ", "").trim();

  if (accessToken && typeof window !== "undefined") {
    localStorage.setItem("accessToken", pureToken);
  }

  return res.data;
}

// 로그아웃 API
export type LogoutResponse = ApiResponse<null>;

export async function logout(): Promise<LogoutResponse> {
  const res = await api.post<LogoutResponse>("/api/auth/logout");

  // 서버에서 로그아웃 성공 응답을 받으면 클라이언트에서도 토큰 제거
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }

  return res.data;
}

// 토큰 재발행 API
export async function reissue() {
  return api.post("/api/auth/reissue");
}
