import MenuSection from "@/components/common/MenuSection";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import BestCoursesSection from "@/components/course/BestCoursesSection";
import CourseCreateButton from "@/components/course/CourseCreateButton";
import RecommendedCourseCard from "@/components/course/RecommendedCourseCard";
import courseList from "@/mock/courseList.json"

export default function Page() {
  return (
    <div className="flex flex-col px-5 pt-3 pb-14 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트3 코스"}>
        <BestCoursesSection bestCourses={courseList.bestCourses} />
      </MenuSection>

      <MenuSection title={"추천 코스"}>
        <div className="w-full flex flex-col gap-4 mt-2">
          <SearchBar />
          <TagSelectSection />
          <div className="flex flex-col gap-3 w-full">
            <div className="grid grid-cols-2 gap-3 w-full">
              {courseList.courses.map((course) => (
                <RecommendedCourseCard
                  key={course.courseId}
                  courseId={course.courseId}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  writer={course.writer}
                  likeNum={course.likeNum}
                  liked={course.liked}
                />
              ))}
            </div>
          </div>
        </div>
      </MenuSection>

      <CourseCreateButton className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-10" />
    </div>
  )
}
