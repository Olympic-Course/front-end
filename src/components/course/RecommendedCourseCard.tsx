import Link from "next/link";
import Image from "next/image";
import LikeIcon from "../common/LikeIcon";
import { Course } from "@/types/course";

export default function RecommendedCourseCard({ courseId, thumbnail, title, writer, liked, likeNum }: Course) {
    const displayThumbnail =
        thumbnail && thumbnail.trim() !== "" ? thumbnail : "/img/OlCo_logo_3.png";

    return (
        <div className="flex flex-col w-full flex-1 min-w-0">
            <Link href={`/courses/${courseId}`} className="w-full">
                {/* 썸네일 이미지 영역 */}
                <div className="relative aspect-4/5 border border-[#E1E1E1] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                        src={displayThumbnail}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                    />
                </div>
            </Link>

            {/* 게시글 정보 영역 - title, writer, tag, likes */}
            <div className="flex p-1 items-center justify-between">
                <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                    <span className="text-sm font-bold truncate">{title}</span>
                    <span className="text-[10px] font-semibold text-[#8E8E8E] truncate">{writer}</span>
                </div>

                {/* 좋아요 영역 */}
                <LikeIcon liked={liked} count={likeNum} />
            </div>
        </div>
    );
}