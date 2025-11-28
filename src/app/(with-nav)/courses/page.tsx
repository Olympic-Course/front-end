import MenuSection from "@/components/common/MenuSection";
import BestCoursesSection from "@/components/course/BestCoursesSection";
import RecommendedCourseCard from "@/components/course/RecommendedCourseCard";
import courseList from "@/mock/courseList.json"

export default function Page() {
  return (
    <div className="flex flex-col h-full px-5 pt-3 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트3 코스"}>
        <BestCoursesSection bestCourses={courseList.bestCourses} />
      </MenuSection>

      <MenuSection title={"추천 코스"}>
        <div className="flex w-full gap-3 justify-between">
          <RecommendedCourseCard
          courseId={55}
          thumbnail={""}
          title={"2NE1 콘서트 코스"}
          writer={"듀?"}
          likeNum={12}
          liked={true}
        />
        <RecommendedCourseCard
          courseId={55}
          thumbnail={""}
          title={"2NE1 콘서트 코스"}
          writer={"듀?"}
          likeNum={12}
          liked={true}
        />
        </div>
      </MenuSection>
    </div>
  )
}
