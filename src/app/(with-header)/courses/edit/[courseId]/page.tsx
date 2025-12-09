"use client"

import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import Modal from "@/components/common/Modal";
import ModalText from "@/components/common/ModalText";
import SecondaryButton from "@/components/common/SecondaryButton";
import TagSelectSection from "@/components/common/TagSelectSection";
import CourseSection from "@/components/course/CourseSection";
import OptionSelectButtonSection from "@/components/course/OptionSelectButtonSection";
import ViewCourseKakaoMap from "@/components/map/ViewCourseKakaoMap";
import { useCourseEdit } from "@/hooks/course/useCourseEdit";
import { useCourseEditStore } from "@/store/courseEditStore";
import { EditCourseRequest } from "@/types/course";
import { Lock, LockOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ courseId: string }>();
    const courseId = Number(params.courseId);

    const {
        title,
        description,
        secret,
        thumbnail,
        duration,
        cost,
        tags,
        steps,

        setTitle,
        setDescription,
        toggleSecretMode,
        setThumbnail,
        setTags,
        setDuration,
        setCost,
        clearAll,
    } = useCourseEditStore();

    useEffect(() => {
        if (thumbnail) return;
        if (steps.length === 0) return;

        const firstStepWithPhoto = steps.find(step => step.photos.length > 0);
        if (!firstStepWithPhoto) return;

        setThumbnail(firstStepWithPhoto.photos[0]);
    }, [steps, thumbnail, setThumbnail]);

    const [showResultModal, setShowResultModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(tags);
    const [memoActiveList, setMemoActiveList] = useState<boolean[]>(
        steps.map(() => false)
    );

    const handleToggleMemo = (index: number) => {
        setMemoActiveList(prev => {
            const newList = [...prev];
            newList[index] = !newList[index]; // 해당 스텝만 토글
            return newList;
        });
    };

    const { mutateAsync: editCourseMutate } = useCourseEdit();

    async function handleEdit(e?: React.FormEvent) {
        if (e) e.preventDefault();

        const body: EditCourseRequest = {
            title,
            secret,
            tag: tags,
            comment: description,
            duration,
            cost,
            steps: steps.map((step) => ({
                stepOrder: step.stepOrder,
                name: step.name,
                latitude: step.latitude,
                longitude: step.longitude,
                description: step.description || null,
                photos: step.photos.map((photoUrl) => ({
                    path: photoUrl,
                    isRep: thumbnail === photoUrl,
                })),
            })),
        };

        try {
            const res = await editCourseMutate({
                courseId,
                data: body,
            });
            console.log("코스 수정  성공:", res);
            clearAll();
            setShowResultModal(true);
        } catch (err) {
            console.error("코스 수정 실패:", err);
        }
    }

    const handleSelectThumbnail = (photoUrl: string) => {
        setThumbnail(photoUrl);
    };

    const goToEditCourse = () => {
        router.push(`/courses/${courseId}`);
    };

    return (
        <HeaderLayout title={"코스 작성하기"}>
            <button
                onClick={toggleSecretMode}
                className="flex items-center gap-0.5 justify-end px-10"
            >
                <span
                    className={`text-xs font-semibold ${secret ? "text-[#0088FF]" : "text-[#CCCCCC]"
                        }`}
                >
                    비밀코스
                </span>
                {/* 아이콘 조건부 렌더링 */}
                {secret ? (
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                </MenuSection>
                <MenuSection title={"어떤 스타일의 코스를 즐기셨나요?"}>
                    <TagSelectSection
                        selectedTags={selectedTags}
                        onChangeTags={(newTags) => {
                            setSelectedTags(newTags);
                            setTags(newTags);
                        }}
                    />
                </MenuSection>
                <MenuSection title={"코스 소개"}>
                    <textarea
                        className="w-full p-3 bg-[#F7F7F7] rounded-xl focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none scrollbar-none"
                        placeholder="코스 관련 소개글을 작성해주세요"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </MenuSection>
                <MenuSection title={"코스 설정"}>
                    {/* 지도 영역 */}
                    <div className="w-full h-60">
                        <ViewCourseKakaoMap Steps={steps} />
                    </div>

                    {/* 코스 스텝 */}
                    {steps.length === 0 ? (
                        // 코스가 없을 때 안내 문구
                        <div className="w-full mt-2 py-3 px-4 rounded-xl bg-[#F7F7F7] flex items-center justify-center">
                            <span className="text-xs font-medium text-[#8E8E93]">
                                장소를 추가해주세요!
                            </span>
                        </div>
                    ) : (
                        // 코스가 있을 때 리스트
                        <div className="flex flex-col w-full gap-2 mt-2">
                            {steps.map((step, idx) => (
                                <CourseSection
                                    key={step.stepOrder}
                                    type={"create"}
                                    stepOrder={step.stepOrder}
                                    name={step.name}
                                    memoActive={memoActiveList[idx]}
                                    onClick={() => handleToggleMemo(idx)}
                                    description={step.description}
                                    photos={step.photos}
                                    thumbnail={thumbnail}
                                    onSelectThumbnail={handleSelectThumbnail}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex w-full mt-2">
                        <SecondaryButton
                            onClick={() => router.push(`/courses/edit/${courseId}/setting`)}
                            label={"장소 추가 및 편집"}
                        />
                    </div>
                </MenuSection>
                <MenuSection title={"총 소요시간이 어떻게 되나요?"}>
                    <OptionSelectButtonSection
                        type={"duration"}
                        selected={duration}
                        onSelect={setDuration}
                    />
                </MenuSection>
                <MenuSection title={"총 소요금액이 어떻게 되나요?"}>
                    <OptionSelectButtonSection
                        type={"cost"}
                        selected={cost}
                        onSelect={setCost}
                    />
                </MenuSection>
                <button
                    className="text-xs font-semibold w-full py-3 rounded-md bg-(--color-main) text-white"
                    onClick={handleEdit}
                >
                    수정하기
                </button>
            </div>
            {/* 회원가입 성공 모달 표시 */}
            {showResultModal && (
                <Modal
                    title="코스 수정 완료"
                    onClose={() => router.push("/courses")}
                >
                    <ModalText
                        text={"코스가 성공적으로 수정되었습니다."}
                        buttonClick={goToEditCourse}
                        buttonLabel="코스 보러가기"
                    />
                </Modal>
            )}
        </HeaderLayout>
    );
}