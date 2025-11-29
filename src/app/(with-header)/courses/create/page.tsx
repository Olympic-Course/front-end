"use client"

import { useState } from "react";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import SecondaryButton from "@/components/common/SecondaryButton";
import CourseLocationItem from "@/components/course/CourseLocationItem";
import LocationPhoto from "@/components/course/LocationPhoto";

export default function Page() {
  const [memoActive, setMemoActive] = useState(false);

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

          <LocationPhoto/>
          
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
      </div>
    </HeaderLayout>
  );
}
