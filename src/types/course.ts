// types/course.ts

export interface Course {
  courseId: number;
  thumbnail?: string;
  title: string;
  writer: string;
  likeNum: number;
  liked: boolean;
}

export interface CourseListResponse {
  bestCourses: Course[];
  courses: Course[];
  nextCursor: number;
  isLast: boolean;
}

export interface Photo {
  path: string;
  isRep: boolean;
}

export interface Step {
  stepId: number;
  stepOrder: number;
  name: string;
}

export interface StepDetail extends Step {
  latitude: number;
  longitude: number;
  description: string | null;
  photos: Photo[];
}

// 기존 Course 타입을 확장해서 상세 타입 생성
export interface CourseDetail extends Course {
  secret: boolean;
  tag: string[];
  comment: string;
  steps: Step[];
  duration: string;
  cost: string;
}

// 코스별 사진 요청 API
export interface CoursePhoto {
  path: string;
  isRep: boolean;
}

// 코스 장소 스텝 요청 API
export interface CourseStepRequest {
  stepOrder: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  photos: CoursePhoto[];
}

// 전체 코스 요청 API
export interface CreateCourseRequest {
  title: string;
  secret: boolean;
  tag: string[];       // enum key 배열 (예: ["ALONE", "COLD"])
  comment: string;
  steps: CourseStepRequest[];
  duration: string;    // enum key
  cost: string;        // enum key
}


// 코스 사진 응답 API
export interface CoursePhotoResponse {
  photoId: number;
  path: string;
  isRep: boolean;
}

// 코스 장소 스텝 응답 API
export interface CourseStepResponse {
  stepId: number;
  stepOrder: number;
  name: string;
  latitude: number;
  longitude: number;
  descriptionKo: string | null;
  photos: CoursePhotoResponse[];
}

// 전체 코스 응답 API
export interface CreateCourseResponse {
  success: boolean;
  code: string;
  data: {
    courseId: number;
    title: string;
    writer: string;
    secret: boolean;
    tag: string[];
    comment: string;
    steps: CourseStepResponse[];
    duration: string;
    cost: string;
  };
}

// presignedUrl 발급 요청 API
export interface PresignedUrlResponse {
  success: boolean;
  code: string;
  data: {
    url: string;
    fileName: string;
  };
}