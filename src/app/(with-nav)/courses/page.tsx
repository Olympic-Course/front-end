"use client";

import MenuSection from "@/components/common/MenuSection";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import BestCoursesSection from "@/components/course/BestCoursesSection";
import CourseCreateButton from "@/components/course/CourseCreateButton";
import RecommendedCourseCard from "@/components/course/RecommendedCourseCard";
import courseList from "@/mock/courseList.json"
import useCourseListGet from "@/hooks/course/useCourseListGet";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTags = searchParams.getAll("tag"); // 배열 파싱
  const initialKeyword = searchParams.get("keyword") ?? "";

  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [localKeyword, setLocalKeyword] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourseListGet(selectedTags, keyword);

  useEffect(() => {
    function handleScroll() {
      if (!hasNextPage || isFetchingNextPage) return;

      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 데이터 정규화
  const bestCourses = data?.pages[0]?.data.bestCourses ?? [];
  const allCourses = data?.pages.flatMap((page) => page.data.courses) ?? [];

  function updateURL(tags: string[], keyword: string) {
    const params = new URLSearchParams();

    if (keyword.trim() !== "") params.set("keyword", keyword.trim());
    tags.forEach(tag => params.append("tag", tag));

    router.push(`/courses?${params.toString()}`);
  }


  return (
    <div className="flex flex-col px-5 pt-3 pb-14 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트3 코스"}>
        <BestCoursesSection bestCourses={bestCourses} />
      </MenuSection>

      <MenuSection title={"추천 코스"}>
        <div className="w-full flex flex-col gap-4 mt-2">
          <SearchBar
            value={localKeyword}
            onChange={setLocalKeyword}
            onSubmit={() => {
              const trimmed = localKeyword.trim();
              setKeyword(trimmed);
              updateURL(selectedTags, trimmed); // URL 동기화
            }}
          />

          <TagSelectSection
            selectedTags={selectedTags}
            onChangeTags={(newTags) => {
              setSelectedTags(newTags);
              updateURL(newTags, keyword);   // URL 동기화
            }}
          />
          <div className="grid grid-cols-2 gap-3 w-full">
            {allCourses.map((course) => (
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
          {/* 로딩 표시 */}
          {isFetchingNextPage && (
            <p className="text-center text-gray-400 py-4">불러오는 중...</p>
          )}
        </div>
      </MenuSection>

      <CourseCreateButton className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-10" />
    </div>
  )
}
