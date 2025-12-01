"use client";

import { useState } from "react";
import BottomModal from "@/components/common/BottomModal";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import EditCourseSection from "@/components/course/EditCourseSection";
import SelectedLocationItem from "@/components/course/SelectedLocationItem";
import KakaoMap from "@/components/map/KakaoMap";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <HeaderLayout title={"장소 추가하기"}>
            <div className="flex flex-col h-[calc(100vh-64px)]">
                <div className="w-full h-full">
                    <KakaoMap />
                </div>

                <BottomModal
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <div className="flex-1 w-full overflow-y-auto px-5 pb-5 flex flex-col gap-5">
                        <MenuSection title={"선택된 장소"}>
                            <SelectedLocationItem locationIcon={"/icons/CONVENIENCE.svg"} name={"포메인"} />
                        </MenuSection>
                        <MenuSection title={"추가된 장소"}>
                            <div className="flex flex-col w-full gap-5">
                                <div className="flex flex-col w-full gap-2">
                                    <EditCourseSection />
                                    <EditCourseSection />
                                    <EditCourseSection />
                                </div>
                                <PrimaryButton
                                    onClick={() => router.back()}
                                    label={"추가된 장소 저장"}
                                />
                            </div>
                        </MenuSection>
                    </div>
                </BottomModal>
            </div>
        </HeaderLayout>
    );
}