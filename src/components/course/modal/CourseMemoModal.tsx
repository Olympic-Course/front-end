"use client"

import { useRef, useState } from "react";
import CourseLocationItem from "../CourseLocationItem";
import { Step } from "@/types/course";

interface CourseMemoModalProps {
    courseSteps: Step[];
}

export default function CourseMemoModal({ courseSteps }: CourseMemoModalProps) {
    const [memoActiveList, setMemoActiveList] = useState<boolean[]>(
        Array(courseSteps.length).fill(false)
    );

    const toggleMemoActive = (index: number) => {
        setMemoActiveList(prev =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // textarea 자동 높이 조절
    const handleResizeHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    return (
        <div className="flex flex-col w-full gap-2 overflow-y-auto">
            {courseSteps.map((step, index) => (
                <div className="flex flex-col w-full gap-1">
                    <CourseLocationItem
                        key={step.stepId}
                        stepOrder={step.stepOrder}
                        name={step.name}
                        memoActive={memoActiveList[index]}
                        onClick={() => toggleMemoActive(index)}
                    />
                    {
                        memoActiveList[index] && (
                            <textarea
                                ref={textareaRef}
                                onInput={handleResizeHeight}
                                rows={1}
                                className="rounded-xl p-3 gap-2 text-gray-700 whitespace-pre-line leading-relaxed w-full bg-[#F7F7F7] focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none"
                                placeholder="메모를 입력하세요"
                            />
                        )
                    }
                </div>
            ))}
        </div>
    );
}