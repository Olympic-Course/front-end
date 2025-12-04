// src/api/course.ts
import api from "@/libs/AxiosInstance";
import { ApiResponse } from "@/types/api";
import type { CreateCourseRequest, CreateCourseResponse, PresignedUrlResponse } from "@/types/course";


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