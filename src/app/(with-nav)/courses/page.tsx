import MenuSection from "@/components/common/MenuSection";
import BestCoursesSection from "@/components/course/BestCoursesSection";
import courseList from "@/mock/courseList.json"

export default function Page() {
  return (
    <div className="flex flex-col h-full px-5 pt-3 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트3 코스"}>
        <BestCoursesSection bestCourses={courseList.bestCourses} />
      </MenuSection>
    </div>
  )
}
