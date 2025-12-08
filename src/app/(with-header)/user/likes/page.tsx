"use client";

import HeaderLayout from "@/components/common/HeaderLayout";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import UserCourseList from "@/components/user/UserCourseList";
import userLikedCourseList from "@/mock/userLikedCourseList.json"
import { useEffect, useState } from "react";
import useUserLikedGet from "@/hooks/user/useUserLikedGet";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 초기값 읽기
  const initialTags = searchParams.getAll("tag");
  const initialKeyword = searchParams.get("keyword") ?? "";

  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [localKeyword, setLocalKeyword] = useState(initialKeyword); // 입력 중 검색어
  const [keyword, setKeyword] = useState(initialKeyword);           // 실제 검색 실행 시 keyword

  // API 연동
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useUserLikedGet(selectedTags, keyword);

  const likedCourses =
  data?.pages.flatMap((page) =>
    Array.isArray(page.courses) ? page.courses : []
  ) ?? [];

  // URL 업데이트 함수
  function updateURL(tags: string[], keyword: string) {
    const params = new URLSearchParams();

    if (keyword.trim() !== "") params.set("keyword", keyword.trim());
    tags.forEach((t) => params.append("tags", t));

    router.push(`/user/likes?${params.toString()}`);
  }

  // 무한 스크롤 이벤트
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


  return (
    <HeaderLayout title={"내가 좋아요 한 코스"}>
      <div className="flex flex-col h-full px-10 pb-10 justify-start items-center gap-5">
        <SearchBar
          value={localKeyword}
          onChange={setLocalKeyword}
          onSubmit={() => {
            const trimmed = localKeyword.trim();
            setKeyword(trimmed);
            updateURL(selectedTags, trimmed);
          }}
        />
        <TagSelectSection
          selectedTags={selectedTags}
          onChangeTags={(newTags) => {
            setSelectedTags(newTags);
            updateURL(newTags, keyword);
          }}
        />
        <div className="w-full flex flex-col gap-3">
          {isLoading && <p className="text-center text-gray-400">불러오는 중...</p>}
          {error && <p className="text-center text-red-500">에러 발생</p>}

          {!isLoading && likedCourses.map((course) => (
            <UserCourseList
              key={course.courseId}
              courseId={course.courseId}
              thumbnail={course.thumbnail}
              title={course.title}
              writer={course.writer}
              tags={course.tags}
              liked={course.liked}
              likeNum={course.likeNum}
            />
          ))}
        </div>
      </div>
    </HeaderLayout>
  )
}
