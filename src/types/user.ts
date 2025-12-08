// types/auth.ts

// 유저 정보 data 타입
export interface UserData {
  userId: number;
  email: string;
  nickname: string;
  postCount: number;
  likedPostCount: number;
}

// 중복 체크 type의 타입
export type CheckType = "email" | "nickname";

// 중복 체크 API 요청 타입 
export interface CheckDuplicateRequest {
  type: CheckType;
  content: string;
}

// 현재 비밀번호 확인 API 요청 타입
export interface PasswordCheckRequest {
  curPassword: string;
}

// 비밀번호 변경 API 요청 타입
export interface PasswordUpdateRequest {
  newPassword: string;
}

//회원 정보 수정 API 요청 타입
export interface UserUpdateRequest {
  nickname: string;
}

// 유저가 좋아요한 코스 타입
export interface UserLikedCourse {
  courseId: number;
  thumbnail: string;
  title: string;
  writer: string;
  tags: string[];
  likeNum: number;
  liked: boolean;
}

export interface UserWrittenCourse {
  courseId: number;
  thumbnail: string | null;
  title: string;
  writer: string;
  likeNum: number;
  liked: boolean;
  tags: string[];
}


export interface GetUserWrittenListResponse {
  courses: UserWrittenCourse[];
  nextCursor: number | null;
  isLast: boolean;
}