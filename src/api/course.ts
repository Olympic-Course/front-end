// src/api/course.ts
import api from "@/libs/AxiosInstance";
import qs from "qs";
import type {
  CreateCourseRequest,
  CreateCourseResponse,
  EditCourseRequest,
  EditCourseResponse,
  PresignedUrlResponse,
  GetCourseListResponse,
  GetCourseDetailResponse,
  CourseMemoRequest,
} from "@/types/course";
import { ApiResponse } from "@/types/api";


// 코스 작성 API
export async function createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {
  const res = await api.post<CreateCourseResponse>("/api/courses", data);
  return res.data;
}

// 코스 수정 API
export async function editCourse(
  courseId: number,
  data: EditCourseRequest
): Promise<EditCourseResponse> {
  const res = await api.put<EditCourseResponse>(`/api/courses/${courseId}`, data);
  return res.data;
}

// 코스 삭제 API
export async function deleteCourse(courseId: number): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>(`/api/courses/${courseId}`);
  return res.data;
}

// presignedUrl 발급 API
export async function getPresignedUrl(
  ext: string
): Promise<PresignedUrlResponse["data"]> {
  const res = await api.post<PresignedUrlResponse>("/api/file/presigned", {
    ext,
  });
  return res.data.data;
}

// 코스 리스트 조회 API
interface CourseListParams {
  tags?: string[];
  keyword?: string;
  cursor?: number | null;
}

export async function getCourseList(params: CourseListParams): Promise<GetCourseListResponse> {
  const { tags, keyword, cursor } = params;

  const res = await api.get<GetCourseListResponse>("/api/courses", {
    params: {
      ...(tags && tags.length > 0 ? { tags } : {}),   // ← tag 배열이 비어있으면 제외
      ...(keyword ? { keyword } : {}),             // keyword 없으면 제외
      ...(cursor !== null ? { cursor } : {}),      // cursor NULL 이면 제외
    },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
      // tag=A&tag=B&tag=C 형태로 변환
      // arrayFormat: "comma" => tag=A,B,C
    },
  });

  return res.data;
}

// 코스 상세조회 API
export async function getCourseDetail(courseId: number): Promise<GetCourseDetailResponse> {
  const res = await api.get<GetCourseDetailResponse>(`/api/courses/${courseId}`);
  return res.data;
}

// 코스 좋아요 등록 및 해제 API
export async function toggleLike(courseId: number) {
  const res = await api.post(`/api/courses/${courseId}/like`);
  return res.data.data;
}


// 코스 메모하기 API
export async function postCourseMemo(
  courseId: number,
  payload: CourseMemoRequest
) {
  const res = await api.post(`/api/courses/${courseId}/user-courses`, payload);
  return res.data;
}

// 코스 메모 수정하기 API
export async function updateCourseMemo(
  courseId: number,
  userCourseId: number,
  payload: CourseMemoRequest
) {
  const res = await api.put(
    `/api/courses/${courseId}/user-courses/${userCourseId}`,
    payload
  );
  return res.data;
}