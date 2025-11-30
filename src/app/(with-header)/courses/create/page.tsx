"use client"

import { useState } from "react";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import SecondaryButton from "@/components/common/SecondaryButton";
import CourseLocationItem from "@/components/course/CourseLocationItem";
import OptionSelectButtonSection from "@/components/course/OptionSelectButtonSection";
import TagSelectSection from "@/components/common/TagSelectSection";
import { Lock, LockOpen } from "lucide-react";
import KakaoMap from "@/components/map/KakaoMap";

export default function Page() {
  const [secretMode, setsecretMode] = useState(false);
  const [memoActive, setMemoActive] = useState(false);

  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedCost, setSelectedCost] = useState("");

  function handlePost(e?: React.FormEvent) {
    if (e) e.preventDefault();
    //게시하기 버튼 클릭 시 이벤트
  }

  return (
    <HeaderLayout title={"코스 작성하기"}>
      <button
        onClick={() => setsecretMode(prev => !prev)}
        className="flex items-center gap-0.5 justify-end px-10"
      >
        <span
          className={`text-xs font-semibold ${secretMode ? "text-[#0088FF]" : "text-[#CCCCCC]"
            }`}
        >
          비밀코스
        </span>
        {/* 아이콘 조건부 렌더링 */}
        {secretMode ? (
          <Lock size={20} color="#0088FF" />
        ) : (
          <LockOpen size={20} color="#CCCCCC" />
        )}
      </button>
      <div className="flex flex-col h-full px-10 pb-5 justify-start items-center gap-5">
        <MenuSection title={"코스명을 입력해주세요"}>
          <input
            className="w-full p-3 bg-[#F7F7F7] rounded-xl focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium"
            placeholder="코스명을 입력해주세요"
            type="text"
          />
        </MenuSection>
        <MenuSection title={"어떤 스타일의 코스를 즐기셨나요?"}>
          <TagSelectSection />
        </MenuSection>
        <MenuSection title={"코스 소개"}>
          <textarea
            className="w-full p-3 bg-[#F7F7F7] rounded-xl focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none scrollbar-none"
            placeholder="코스 관련 소개글을 작성해주세요"
            rows={4}
          />
        </MenuSection>
        <MenuSection title={"코스 설정"}>
          {/* 지도 영역 */}
          <div className="w-full h-60">
            <KakaoMap />
          </div>
          <div className="flex flex-col w-full gap-2 mt-2">
            <CourseLocationItem
              stepOrder={1}
              name={"수변공원"}
              memoActive={memoActive}
              onClick={() => setMemoActive(prev => !prev)}
            />
            <CourseLocationItem
              stepOrder={2}
              name={"수변공원"}
              memoActive={memoActive}
              onClick={() => setMemoActive(prev => !prev)}
            />
            <CourseLocationItem
              stepOrder={3}
              name={"수변공원"}
              memoActive={memoActive}
              onClick={() => setMemoActive(prev => !prev)}
            />
          </div>

          <div className="flex w-full gap-3 mt-2">
            <SecondaryButton
              onClick={() => { }}
              label={"장소 추가"}
            />
            <SecondaryButton
              onClick={() => { }}
              label={"장소 편집"}
            />
          </div>
        </MenuSection>
        <MenuSection title={"총 소요시간이 어떻게 되나요?"}>
          <OptionSelectButtonSection
            type={"duration"}
            selected={selectedDuration}
            onSelect={setSelectedDuration}
          />
        </MenuSection>
        <MenuSection title={"총 소요금액이 어떻게 되나요?"}>
          <OptionSelectButtonSection
            type={"cost"}
            selected={selectedCost}
            onSelect={setSelectedCost}
          />
        </MenuSection>
        <button
          className="text-xs font-semibold w-full py-3 rounded-md bg-(--color-main) text-white"
          onClick={handlePost}
        >
          게시하기
        </button>
      </div>
    </HeaderLayout>
  );
}
