"use client"

import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import SecondaryButton from "@/components/common/SecondaryButton";

export default function Page() {
  return (
    <HeaderLayout title={"코스 작성하기"}>
      <div className="flex flex-col h-full px-10 pb-3 justify-start items-center gap-5">
        <MenuSection title={"코스 설정"}>
          <div className="flex w-full gap-3">
            <SecondaryButton
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              label={"장소 추가"}
            />
            <SecondaryButton
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              label={"장소 편집"}
            />
          </div>
        </MenuSection>
      </div>
    </HeaderLayout>
  );
}
