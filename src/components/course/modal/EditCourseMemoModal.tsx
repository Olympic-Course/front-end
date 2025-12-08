"use client";

import { useRef, useState } from "react";
import CourseLocationItem from "../CourseLocationItem";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useUpdateCourseMemo } from "@/hooks/course/useUpdateCourseMemo";
import { useCourseNavigationStore } from "@/store/courseNavigationStore";

interface EditCourseMemoModalProps {
    courseSteps: {
        stepId: number;
        stepOrder: number;
        name: string;
        memo: string | null;
    }[];
    courseId: number;
    userCourseId: number;
    onClose: () => void;
}

export default function EditCourseMemoModal({
    courseSteps,
    courseId,
    
    userCourseId,
    onClose
}: EditCourseMemoModalProps) {

    const [memoActiveList, setMemoActiveList] = useState<boolean[]>(
        Array(courseSteps.length).fill(false)
    );

    const [memoValues, setMemoValues] = useState(
        courseSteps.map(step => ({
            stepId: step.stepId,
            memo: step.memo ?? ""
        }))
    );

    const { mutateAsync: updateMemo } = useUpdateCourseMemo(courseId, userCourseId);

    const setNavigationData = useCourseNavigationStore(state => state.setNavigationData);

    const toggleMemoActive = (index: number) => {
        setMemoActiveList(prev =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleResizeHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleMemoChange = (index: number, value: string) => {
        setMemoValues(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, memo: value } : item
            )
        );
    };

    const handleSubmit = async () => {
        try {
            const res = await updateMemo({ steps: memoValues }); // ← 수정 API 호출

            const { userCourseId, userSteps } = res.data;

            // 🔥 store 업데이트
            setNavigationData({
                userCourseId,
                userSteps,
            });

            onClose(); // 모달 닫기
        } catch (err) {
            console.error("메모 수정 실패", err);
        }
    };

    return (
        <div className="flex flex-col w-full gap-2 overflow-y-auto">
            {courseSteps.map((step, index) => (
                <div key={step.stepId} className="flex flex-col w-full gap-1">
                    <CourseLocationItem
                        stepOrder={step.stepOrder}
                        name={step.name}
                        memoActive={memoActiveList[index]}
                        onClick={() => toggleMemoActive(index)}
                    />

                    {memoActiveList[index] && (
                        <textarea
                            ref={textareaRef}
                            value={memoValues[index].memo}
                            onChange={(e) => handleMemoChange(index, e.target.value)}
                            onInput={handleResizeHeight}
                            rows={1}
                            className="rounded-xl p-3 gap-2 text-gray-700 whitespace-pre-line leading-relaxed w-full bg-[#F7F7F7] focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none"
                            placeholder="메모를 입력하세요"
                        />
                    )}
                </div>
            ))}

            <PrimaryButton
                onClick={handleSubmit}
                label="수정 완료"
            />
        </div>
    );
}
