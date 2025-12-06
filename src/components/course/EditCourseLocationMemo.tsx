"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CircleX, Plus } from "lucide-react";
import { usePresignedUrl } from "@/hooks/course/usePresignedUrl";

interface EditCourseLocationMemoProps {
    description: string;
    photos: string[];
    onChangeDescription: (value: string) => void;
    onAddPhoto: (fileName: string) => void;
    onRemovePhoto: (photoIndex: number) => void;
}

export default function EditCourseLocationMemo({
    description,
    photos,
    onChangeDescription,
    onAddPhoto,
    onRemovePhoto
}: EditCourseLocationMemoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const CLOUD_FRONT = "https://dpv9t0vlhs3c7.cloudfront.net";

    const { mutateAsync: getPresigned } = usePresignedUrl();

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

    const uploadToS3 = async (uploadUrl: string, file: File) => {
        await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            }
        });
    };

    // 파일 선택 후 이미지 추가
    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const ext = file.name.split(".").pop() || "png";

        try {
            // 1) Presigned URL 요청
            const { url, fileName } = await getPresigned(ext);

            // 2) S3 업로드
            await uploadToS3(url, file);

            // 3) CloudFront URL 조립 후 부모에게 전달
            const fullImageUrl = `${CLOUD_FRONT}/${fileName}`;
            onAddPhoto(fullImageUrl);

        } catch (error) {
            console.error("이미지 업로드 실패", error);
        }
    };

    // 이미지 삭제
    {
        photos.map((img, index) => (
            <div key={index} className="relative w-28 h-32 rounded-xl overflow-hidden shrink-0">
                <Image src={img} alt="photo" fill className="object-cover" />

                <button
                    onClick={() => onRemovePhoto(index)}
                    className="absolute top-1 right-1"
                >
                    <CircleX size={18} fill="#FF5252" color="#FFFFFF" />
                </button>
            </div>
        ))
    }


    return (
        <div className="flex flex-col w-full p-3 gap-2 bg-[#F7F7F7] rounded-xl justify-start">
            <textarea
                ref={textareaRef}
                onInput={handleResizeHeight}
                rows={1}
                className="text-gray-700 whitespace-pre-line leading-relaxed w-full bg-[#F7F7F7] focus:outline-none text-sm font-medium placeholder:text-gray-300 placeholder:font-medium resize-none"
                placeholder="메모를 입력하세요"
                value={description}
                onChange={(e) => {
                    onChangeDescription(e.target.value);
                    handleResizeHeight();
                }}
            />
            <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                {/* 이미지 렌더링 */}
                {photos.map((img, index) => (
                    <div key={index} className="relative w-28 h-32 rounded-xl overflow-hidden shrink-0">
                        <Image src={img} alt="photo" fill className="object-cover" />

                        <button
                            onClick={() => onRemovePhoto(index)}
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