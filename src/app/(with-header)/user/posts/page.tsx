import HeaderLayout from "@/components/common/HeaderLayout";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import UserCourseList from "@/components/user/UserCourseList";
import userPostedCourseList from "@/mock/userPostedCourseList.json"

export default function Page() {
  return (
    <HeaderLayout title={"작성 글 리스트"}>
      <div className="flex flex-col h-full px-10 pb-10 justify-start items-center gap-5">
        <SearchBar />
        <TagSelectSection />
        <div className="w-full flex flex-col gap-3">
          {userPostedCourseList.map((course) => (
            <UserCourseList
              key={course.courseId}
              courseId={course.courseId}
              thumbnail={course.thumbnail}
              title={course.title}
              writer={course.writer}
              tag={course.tag}
              liked={course.liked}
              likeNum={course.likeNum}
            />
          ))}
        </div>
      </div>
    </HeaderLayout>
  )
}
