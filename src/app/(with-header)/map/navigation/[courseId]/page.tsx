"use client"

import BottomModal from "@/components/common/BottomModal";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import PrimaryButton from "@/components/common/PrimaryButton";
import CourseSection from "@/components/course/CourseSection";
import KakaoMap from "@/components/map/KakaoMap";
import MapFilter from "@/components/map/MapFilter";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <HeaderLayout title="코스 따라가기">
            <div className="flex flex-col h-[calc(100vh-64px)] relative">
                <div className="w-full h-full">
                    <KakaoMap />
                </div>
                <MapFilter />
                <BottomModal
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <div className="flex-1 w-full overflow-y-auto px-5 pb-5 flex flex-col gap-5">
                        <MenuSection title={"듀?님이 걷고있는 코스"}>
                            <div className="flex flex-col gap-2 my-2 w-full">
                                {/* <CourseSection stepOrder={1} name={"팔각정2"} />
                                <CourseSection stepOrder={2} name={"팔각정3"} />
                                <CourseSection stepOrder={3} name={"팔각정4"} />
                                <CourseSection stepOrder={4} name={"팔각정5"} /> */}
                            </div>
                        </MenuSection>
                        <PrimaryButton 
                        label={"안내 종료"}
                        onClick={() => router.back()}
                        />
                    </div>
                </BottomModal>
            </div>
        </HeaderLayout>
    );
}