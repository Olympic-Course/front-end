"use client"

import BottomModal from "@/components/common/BottomModal";
import HeaderLayout from "@/components/common/HeaderLayout";
import PrimaryButton from "@/components/common/PrimaryButton";
import CourseSection from "@/components/course/CourseSection";
import MapFilter from "@/components/map/MapFilter";
import NaviKakaoMap from "@/components/map/NaviKakaoMap";
import { usePlacesGet } from "@/hooks/map/usePlacesGet";
import { useCourseNavigationStore } from "@/store/courseNavigationStore";
import { useUserStore } from "@/store/userStore";
import { Category } from "@/types/map";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Modal from "@/components/common/Modal";
import EditCourseMemoModal from "@/components/course/modal/EditCourseMemoModal";

export default function Page() {
    const params = useParams<{ courseId: string }>();
    const courseId = Number(params.courseId);

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([
        // "RESTROOM",
        // "TRASHCAN",
        // "FOUNTAIN",
        // "SMOKING_BOOTH",
        // "VENDING_MACHINE",
    ]);
    const [pinState, setPinState] = useState<"pinOn" | "pinOff">("pinOn");

    const [showCourseMemoModal, setShowCourseMemoModal] = useState(false);
    const { userCourseId, userSteps } = useCourseNavigationStore();
    const clearNavigationData = useCourseNavigationStore((state) => state.clearNavigationData);
    const { nickname } = useUserStore();

    // courseData가 준비될 때 메모 리스트 초기화
    const [memoActiveList, setMemoActiveList] = useState<boolean[]>([]);

    useEffect(() => {
        if (userSteps.length > 0) {
            setMemoActiveList(Array(userSteps.length).fill(false));
        }
    }, [userSteps]);

    const { data, isLoading } = usePlacesGet(selectedCategories);

    const toggleMemoActive = (index: number) => {
        setMemoActiveList(prev =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    return (
        <HeaderLayout title="코스 따라가기">
            <div className="flex flex-col h-[calc(100vh-64px)] relative">
                <div className="w-full h-full">
                    <NaviKakaoMap places={data?.data} isLoading={isLoading} steps={userSteps} showPins={pinState === "pinOn"} />
                </div>
                <MapFilter
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                    pinState={pinState}
                    onPinToggle={() =>
                        setPinState(prev => (prev === "pinOn" ? "pinOff" : "pinOn"))
                    }
                />
                <BottomModal
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <div className="flex-1 w-full overflow-y-auto px-5 pb-5 flex flex-col gap-5">
                        <div className="w-full flex flex-col gap-1 justify-start items-start">
                            <div className="flex w-full justify-between items-cente px-3">
                                <span className="text-lg font-bold">{`${nickname}님이 걷고있는 코스`}</span>
                                <button onClick={() => setShowCourseMemoModal(true)}>
                                    <Pencil size={18} color="#989898" />
                                </button>

                            </div>
                            <div className="flex flex-col gap-2 my-2 w-full">
                                {userSteps.map((step, index) => (
                                    <CourseSection
                                        key={step.stepId}
                                        type={"detail"}
                                        stepOrder={step.stepOrder}
                                        name={step.name}
                                        memoActive={memoActiveList[index]}
                                        onClick={() => toggleMemoActive(index)}
                                        description={step.memo ?? ""}
                                        onSelectThumbnail={() => { }}
                                        thumbnail={null}
                                    />
                                ))}
                            </div>
                        </div>
                        <PrimaryButton
                            label={"안내 종료"}
                            onClick={() => {
                                clearNavigationData(); // ✅ 따라가기 데이터 초기화
                                router.back();         // 🔙 이전 페이지로 이동
                            }}
                        />
                    </div>
                </BottomModal>
            </div>
            {showCourseMemoModal && userCourseId !== null && (
                <Modal
                    title="장소별 메모 작성"
                    onClose={() => setShowCourseMemoModal(false)}
                >
                    <EditCourseMemoModal
                        courseSteps={userSteps}
                        courseId={courseId} // 이제 number만 전달됨
                        userCourseId={userCourseId}
                        onClose={() => setShowCourseMemoModal(false)}
                    />
                </Modal>
            )}
        </HeaderLayout>
    );
}