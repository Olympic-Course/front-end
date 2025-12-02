"use client"

import BottomModal from "@/components/common/BottomModal";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import CourseSection from "@/components/course/CourseSection";
import KakaoMap from "@/components/map/KakaoMap";
import MapFilter from "@/components/map/MapFilter";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <HeaderLayout>
            <div className="flex flex-col h-[calc(100vh-64px)]">
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
                            <CourseSection stepOrder={1} name={"팔각정2"} />
                        </MenuSection>
                    </div>
                </BottomModal>
            </div>
        </HeaderLayout>
    );
}