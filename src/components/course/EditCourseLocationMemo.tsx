"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CircleX, Plus } from "lucide-react";

export default function EditCourseLocationMemo() {
    const [images, setImages] = useState<string[]>([]); // 이미지 URL 배열

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // textarea 자동 높이 조절
    const handleResizeHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleClickAdd = () => {
        fileInputRef.current?.click();
    };

    // 파일 선택 후 이미지 추가
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setImages((prev) => [...prev, previewURL]);
    };

    // 이미지 삭제
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col w-full p-3 gap-2 bg-[#F7F7F7] rounded-xl justify-start">
            <textarea
                ref={textareaRef}
                onInput={handleResizeHeight}
                rows={1}
                className="text-gray-700 whitespace-pre-line leading-relaxed w-full bg-[#F7F7F7] focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none"
                placeholder="메모를 입력하세요"
            />
            <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                {/* 이미지 렌더링 */}
                {images.map((img, index) => (
                    <div key={index} className="relative w-28 h-32 rounded-xl overflow-hidden shrink-0">
                        <Image
                            src={img}
                            alt="preview"
                            fill
                            className="object-cover"
                        />

                        {/* 삭제 버튼 */}
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1"
                        >
                            <CircleX size={18} fill="#FF5252" color="#FFFFFF" />
                        </button>
                    </div>
                ))}

                {/* + 버튼 박스 */}
                <div
                    onClick={handleClickAdd}
                    className="w-28 h-32 shrink-0 rounded-xl border border-dashed border-[#D9D9D9] flex items-center justify-center cursor-pointer"
                >
                    <Plus color="#D9D9D9" />
                </div>

                {/* 숨겨진 input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAddImage}
                    className="hidden"
                />
            </div>
        </div>
    );
}