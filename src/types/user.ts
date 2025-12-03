// types/auth.ts

// 중복 체크 type의 타입
export type CheckType = "email" | "nickname";

// 중복 체크 API 요청 타입 
export interface CheckDuplicateRequest {
  type: CheckType;
  content: string;
}