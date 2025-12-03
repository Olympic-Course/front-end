// 공통 API Response 타입
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  data: T;
}