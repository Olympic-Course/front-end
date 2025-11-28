import HeaderLayout from "@/components/common/HeaderLayout";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import UserCourseList from "@/components/user/UserCourseList";
import userLikedCourseList from "@/mock/userLikedCourseList.json"

export default function Page() {
  return (
    <HeaderLayout title={"내가 좋아요 한 코스"}>
      <div className="flex flex-col h-full px-10 pb-10 justify-start items-center gap-5">
        <SearchBar />
        <TagSelectSection />
        <div className="w-full flex flex-col gap-3">
          {userLikedCourseList.map((course) => (
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
