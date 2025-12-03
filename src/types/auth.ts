// types/auth.ts

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 시 응답으로 오는 data 타입
export interface LoginData {
  userId: number;
  email: string;
  nickname: string;
}