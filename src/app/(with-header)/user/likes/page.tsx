import SearchBar from "@/components/common/SearchBar";
import TagButton from "@/components/common/TagButton";
import UserCourseList from "@/components/user/UserCourseList";
import userLikedCourseList from "@/mock/userLikedCourseList.json"

export default function Page() {
  return (
    <div className="flex flex-col h-full px-10 justify-start items-center gap-5">
      <SearchBar />
      <TagButton label={"뚜벅이"} active={false} />
      <TagButton label={"자차"} active={true} />
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
