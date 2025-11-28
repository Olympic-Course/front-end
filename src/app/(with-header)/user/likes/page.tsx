import SearchBar from "@/components/common/SearchBar";
import UserCourseList from "@/components/user/UserCourseList";
import userLikedCourseList from "@/mock/userLikedCourseList.json"

export default function Page() {
  return (
    <div className="flex flex-col h-full px-10 justify-start items-center gap-5">
      <SearchBar />
      <div className="w-full flex flex-col gap-3 mt-5">
        {userLikedCourseList.map((course) => (
        <UserCourseList
          key={course.courseId}
          courseId={course.courseId}
          title={course.title}
          writer={course.writer}
          tag={course.tag}
          liked={course.liked}
          likeNum={course.likeNum}
        />
      ))}
      </div>
    </div>
  )
}
