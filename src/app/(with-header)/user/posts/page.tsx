"use client";
export const dynamic = "force-dynamic";

import HeaderLayout from "@/components/common/HeaderLayout";
import SearchBar from "@/components/common/SearchBar";
import TagSelectSection from "@/components/common/TagSelectSection";
import UserCourseList from "@/components/user/UserCourseList";
import userPostedCourseList from "@/mock/userPostedCourseList.json"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useUserWrittenGet from "@/hooks/user/useUserWrittenGet";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 초기값
  const initialTags = searchParams.getAll("tags");
  const initialKeyword = searchParams.get("keyword") ?? "";
  const initialVisibility = searchParams.get("visibility") ?? "ALL";

  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [localKeyword, setLocalKeyword] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [visibility, setVisibility] = useState(initialVisibility);

  // API 호출
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useUserWrittenGet(visibility, selectedTags, keyword);

  const postedCourses =
    data?.pages.flatMap((page) =>
      Array.isArray(page.courses) ? page.courses : []
    ) ?? [];

  // URL 업데이트
  function updateURL(visibility: string, tags: string[], keyword: string) {
    const params = new URLSearchParams();

    params.set("visibility", visibility);

    if (keyword.trim() !== "") {
      params.set("keyword", keyword.trim());
    }

    tags.forEach((t) => params.append("tags", t));

    router.push(`/user/posts?${params.toString()}`);
  }

  // 무한 스크롤
  useEffect(() => {
    function handleScroll() {
      if (!hasNextPage || isFetchingNextPage) return;

      const scrollY = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;

      if (scrollY + clientHeight >= scrollHeight - 50) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


  return (
    <HeaderLayout title={"작성 글 리스트"}>
      <div className="flex flex-col h-full px-10 pb-10 justify-start items-center gap-5">
        <SearchBar
          value={localKeyword}
          onChange={setLocalKeyword}
          onSubmit={() => setKeyword(localKeyword.trim())}
        />
        <TagSelectSection
          selectedTags={selectedTags}
          onChangeTags={setSelectedTags}
        />

        {/* visibility 필터 (예: 전체/공개/비공개) */}
        <div className="flex gap-2 mt-2 text-sm">
          {["ALL", "PUBLIC", "SECRET"].map((v) => (
            <button
              key={v}
              className={`px-4 py-2 rounded-xl text-xs font-semibold
                ${visibility === v ? "bg-(--color-main) text-white" : "bg-white border border-gray-300 text-gray-400"}`}
              onClick={() => {
                setVisibility(v);
                updateURL(v, selectedTags, keyword);
              }}
            >
              {v === "ALL" ? "전체" : v === "PUBLIC" ? "공개" : "비공개"}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          {postedCourses.map((course) => (
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
