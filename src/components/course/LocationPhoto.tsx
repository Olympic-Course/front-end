"use client"

import Image from "next/image";
import ThumbnailSelectButton from "./ThumbnailSelectButton";

interface LocationPhotoProps {
    type: "create" | "detail";
    photoUrl: string;            // 이미지 URL
    thumbnailActive: boolean;    // 대표 여부
    onClickThumbnail: () => void;
}

export default function LocationPhoto({
    type,
    photoUrl,
    thumbnailActive,
    onClickThumbnail
}: LocationPhotoProps) {

    return (
        <div className="flex flex-col items-end gap-1">
            <div className="w-28 h-32 border border-[#E1E1E1] rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={photoUrl}
                    alt="thumbnail"
                    width={112}
                    height={128}
                    className="object-cover w-full h-full"
                />
            </div>
            <ThumbnailSelectButton
                type={type}
                thumbnailActive={thumbnailActive}
                onClick={onClickThumbnail}
            />
        </div>
    );
}