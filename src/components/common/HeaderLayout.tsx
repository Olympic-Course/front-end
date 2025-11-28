"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function HeaderLayout({ title, children }: HeaderLayoutProps) {
    const router = useRouter();

    return (
        <div className='flex flex-col justify-start h-full'>
            {/* 상단 헤더 영역 */}
            {/* 상단 헤더 */}
            <div className="relative p-5 flex items-center">
                {/* 좌측 뒤로가기 버튼 */}
                <button
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="z-10" />
                </button>
                {/* 가운데 제목 */}
                <p className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
                    {title}
                </p>
            </div>
            
            {children}
        </div>
    );
}