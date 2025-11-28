import LikeIcon from "../common/LikeIcon";
import Image from "next/image";
import Tag from "../common/Tag";
import Link from "next/link";

interface UserCourseListProps {
    courseId: number;
    thumbnail?: string | null;
    title: string;
    writer: string;
    tag: string[];
    liked: boolean;
    likeNum: number
}

export default function UserCourseList({ courseId, thumbnail, title, writer, tag, liked, likeNum }: UserCourseListProps) {

    const displayThumbnail = thumbnail || "/img/OlCo_logo_3.png";

    return (
        <Link href={`/courses/${courseId}`} className="flex w-full gap-2">
            {/* 썸네일 이미지 영역 */}
            <div className="relative w-28 aspect-4/3 border border-[#E1E1E1] rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image
                    src={displayThumbnail}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                />
            </div>

            {/* 게시글 정보 영역 - title, writer, tag, likes */}
            <div className="flex flex-col gap-2 flex-1 p-2 min-w-0">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold truncate">{title}</span>
                    <span className="text-[10px] font-semibold text-[#8E8E8E]">{writer}</span>
                </div>

                {/* 태그 영역 */}
                <div className="relative w-full">
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
                        <div className="flex gap-1">
                            {tag.map((item, index) => (
                                <Tag key={index} label={item} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-8 bg-linear-to-l from-white pointer-events-none" />
                </div>

                {/* 좋아요 영역 */}
                <div className="flex justify-end">
                    <LikeIcon liked={liked} count={likeNum} />
                </div>
            </div>
        </Link>
    );
}