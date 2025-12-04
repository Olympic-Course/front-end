'use client';

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/common/Modal";
import ModalText from "@/components/common/ModalText";

export default function CourseCreateButton({ className = "" }) {
    const router = useRouter();
    const { isLoggedIn } = useUserStore();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }
        router.push("/courses/create");
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`flex gap-1 items-center bg-(--color-main) rounded-full px-4 py-2.5 shadow ${className}`}
            >
                <span className="text-[12px] font-semibold text-white">
                    코스 작성하기
                </span>
                <Pencil color="white" size={18} />
            </button>

            {/* 로그인 안 된 상태 → 모달 출력 */}
            {showModal && (
                <Modal title="코스 작성 불가" onClose={() => setShowModal(false)}>
                    <ModalText
                        text={"코스 작성은 로그인한 사용자만 사용가능합니다."}
                        buttonClick={() => router.push("/")}
                        buttonLabel="로그인 하러 가기"
                    />
                </Modal>
            )}
        </>
    );
}