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

    const CLOUD_FRONT = "https://dpv9t0vlhs3c7.cloudfront.net/";

    // fileName → CloudFront URL 변환
    const fullImageUrl = `${CLOUD_FRONT}${photoUrl}`;

    return (
        <div className="flex flex-col items-end gap-1">
            <div className="w-28 h-32 border border-[#E1E1E1] rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={fullImageUrl}
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