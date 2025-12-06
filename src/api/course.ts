// src/api/course.ts
import api from "@/libs/AxiosInstance";
import qs from "qs";
import type { CreateCourseRequest, CreateCourseResponse, PresignedUrlResponse, GetCourseListResponse } from "@/types/course";


// 코스 작성 API
export async function createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {
    const res = await api.post<CreateCourseResponse>("/api/courses", data);
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