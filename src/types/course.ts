export interface Course {
  courseId: number;
  thumbnail: string;
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
