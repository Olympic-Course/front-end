'use client';

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/common/Modal";
import ModalText from "@/components/common/ModalText";
import { useSessionModalStore } from "@/store/sessionModalStore";

export default function CourseCreateButton({ className = "" }) {
    const router = useRouter();
    const { isLoggedIn } = useUserStore();
    const { openLoginModal } = useSessionModalStore();

    const handleClick = () => {
        if (!isLoggedIn) {
            openLoginModal();
            return;
        }
        router.push("/courses/create");
    };

    return (
        <button
            onClick={handleClick}
            className={`flex gap-1 items-center bg-(--color-main) rounded-full px-4 py-2.5 shadow ${className}`}
        >
            <span className="text-[12px] font-semibold text-white">
                코스 작성하기
            </span>
            <Pencil color="white" size={18} />
        </button>
    );
}