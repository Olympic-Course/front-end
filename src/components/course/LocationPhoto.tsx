"use client"

import { useState } from "react";
import Image from "next/image";
import ThumbnailSelectButton from "./ThumbnailSelectButton";

export default function LocationPhoto() {
    const [thumbnailActive, setThumbnailActive] = useState(false);

    // const displayThumbnail =
    //     thumbnail && thumbnail.trim() !== "" ? thumbnail : "/img/OlCo_logo_3.png";

    return (
        <div className="flex flex-col items-end gap-1">
            <div className="w-28 h-32 border border-[#E1E1E1] rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src="/img/OlCo_logo_3.png"
                    alt="thumbnail"
                    width={112}
                    height={128}
                    className="object-cover w-full h-full"
                />
            </div>
            <ThumbnailSelectButton
                thumbnailActive={thumbnailActive}
                onClick={() => setThumbnailActive(prev => !prev)}
            />
        </div>
    );
}