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

// export enum DurationEnum {
//   MIN_0_30 = "MIN_0_30",
//   MIN_30_60 = "MIN_30_60",
//   MIN_60_120 = "MIN_60_120",
//   MIN_120_PLUS = "MIN_120_PLUS",
// }

// export enum CostEnum {
//   WON_0_10000 = "WON_0_10000",
//   WON_10000_20000 = "WON_10000_20000",
//   WON_20000_30000 = "WON_20000_30000",
//   WON_30000_40000 = "WON_30000_40000",
//   WON_40000_50000 = "WON_40000_50000",
//   WON_50000_60000 = "WON_50000_60000",
//   WON_60000_PLUS = "WON_60000_PLUS",
// }