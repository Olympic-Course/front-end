import { Course } from "@/types/course";
import BestCourseCard from "./BestCourseCard";

interface BestCoursesSectionProps {
  bestCourses: Course[];
}

export default function BestCoursesSection({ bestCourses }: BestCoursesSectionProps){
    return(
        <div className="w-full flex justify-between items-center gap-3">
          {bestCourses.map((course) => (
            <BestCourseCard
              key={course.courseId}
              courseId={course.courseId}
              thumbnail={course.thumbnail}
              title={course.title}
              writer={course.writer}
              liked={course.liked}
              likeNum={course.likeNum}
            />
          ))}
        </div>
    );
}