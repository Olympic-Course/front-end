'use client';

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseCreateButton({ className = "" }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/courses/create")}
            className={`flex gap-1 items-center bg-(--color-main) rounded-full px-4 py-2.5 shadow ${className}`}
        >
            <span className="text-[12px] font-semibold text-white ">코스 작성하기</span>
            <Pencil color="white" size={18} />
        </button>
    );
}