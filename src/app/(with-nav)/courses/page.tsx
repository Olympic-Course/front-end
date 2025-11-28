import MenuSection from "@/components/common/MenuSection";

export default function Page() {
  return (
    <div className="flex flex-col h-full px-5 pt-3 justify-start items-center gap-5">
      <MenuSection title={"이달의 베스트 3 코스"}>
        <div className="w-full h-40 bg-amber-300 flex justify-center items-center">
          이달의 베스트 3코스 영역
        </div>
      </MenuSection>
    </div>
  )
}
