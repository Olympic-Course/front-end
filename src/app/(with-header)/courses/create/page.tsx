"use client"

import { useState } from "react";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import SecondaryButton from "@/components/common/SecondaryButton";
import CourseLocationItem from "@/components/course/CourseLocationItem";
import CourseLocationMemo from "@/components/course/CourseLocationMemo";
import OptionSelectButtonSection from "@/components/course/OptionSelectButtonSection";

export default function Page() {
  const [memoActive, setMemoActive] = useState(false);

  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedCost, setSelectedCost] = useState("");

  return (
    <HeaderLayout title={"코스 작성하기"}>
      <div className="flex flex-col h-full px-10 pb-3 justify-start items-center gap-5">
        <MenuSection title={"코스 설정"}>
          <div className="flex flex-col w-full gap-2">
            <CourseLocationItem
              stepOrder={1}
              name={"수변공원"}
              memoActive={memoActive}
              onClick={() => setMemoActive(prev => !prev)}
            />
          </div>

          <CourseLocationMemo
            locationMemo={"춥거나 더울때는 소마미술관으로 대피🚨"}
          />

          <div className="flex w-full gap-3 mt-5">
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
      </div>
    </HeaderLayout>
  );
}
