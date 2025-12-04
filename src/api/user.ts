// src/api/user.ts
import api from "@/libs/AxiosInstance"
import { ApiResponse } from "@/types/api";
import { UserData, CheckDuplicateRequest, PasswordCheckRequest, PasswordUpdateRequest, UserUpdateRequest } from "@/types/user"

// 중복체크 API
export type CheckDuplicateResponse = ApiResponse<null>;

export async function checkDuplicate(data: CheckDuplicateRequest): Promise<CheckDuplicateResponse> {
  const res = await api.post<CheckDuplicateResponse>("/api/users/check", data);
  return res.data;
}

// 회원탈퇴 API
export type DeleteUserResponse = ApiResponse<null>;

export async function deleteUser(): Promise<DeleteUserResponse> {
  const res = await api.delete<DeleteUserResponse>("/api/users/me");
  return res.data;
}

// 회원 정보 조회 API
export type UserGetResponse = ApiResponse<UserData>;

export async function userGet(): Promise<UserGetResponse> {
  const res = await api.get<UserGetResponse>("/api/users/me");
  return res.data;
}

// 회원 정보 수정 API
export type UserUdateResponse = ApiResponse<UserData>;

export async function userUpdate(
  data: UserUpdateRequest
): Promise<UserUdateResponse> {
  const res = await api.patch<UserUdateResponse>(
    "/api/users/me",
    data
  );
  return res.data;
}

// 현재 비밀번호 확인 API
export type PasswordCheckResponse = ApiResponse<null>;

export async function passwordCheck(
  data: PasswordCheckRequest
): Promise<PasswordCheckResponse> {
  const res = await api.post<PasswordCheckResponse>(
    "/api/users/me/password/check",
    data
  );
  return res.data;
}

// 비밀번호 변경 API
export type PasswordUpdateResponse = ApiResponse<null>;

export async function passwordUpdate(
  data: PasswordUpdateRequest
): Promise<PasswordUpdateResponse> {
  const res = await api.put<PasswordUpdateResponse>(
    "/api/users/me/password/change",
    data
  );
  return res.data;
}