import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface UserCourseButtonProps {
    icon: LucideIcon;       // 아이콘 컴포넌트
    label: string;          // 같은 텍스트
    count: number;          // 갯수
    href: string;           // 이동할 링크
}

export default function UserCourseButton({ icon: Icon, label, count, href }: UserCourseButtonProps) {
    return (
        <Link href={href}>
            <div className="w-full flex items-center p-3 rounded-2xl bg-(--color-userCourseList)">

                {/* 왼쪽 (아이콘 + 텍스트) */}
                <div className="flex flex-1 flex-col items-center justify-center gap-1">
                    <Icon className="text-xl"  strokeWidth={2} />
                    <span className="text-xs font-semibold">{label}</span>
                </div>

                {/* 가운데 세로 막대기 */}
                <div className="w-px h-10 bg-gray-300"></div>

                {/* 오른쪽 (숫자) */}
                <div className="flex flex-1 items-center justify-center">
                    <span className="text-xl font-bold">{count}</span>
                </div>
            </div>
        </Link>

    );
}