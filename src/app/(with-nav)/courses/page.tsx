import MenuSection from "@/components/common/MenuSection";
import BestCourseCard from "@/components/course/BestCourseCard";
import courseList from "@/mock/courseList.json"

export default function Page() {
  return (
    <div className="flex flex-col h-full px-5 pt-3 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트3 코스"}>
        <div className="w-full flex justify-between items-center gap-3">
          {courseList.bestCourses.map((course) => (
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
      </MenuSection>
    </div>
  )
}
