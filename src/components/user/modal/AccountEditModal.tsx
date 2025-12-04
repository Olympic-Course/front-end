"use client"

import PrimaryButton from "@/components/common/PrimaryButton";
import AuthInput from "../AuthInput";
import { useState } from "react";
import useAuthInputValidation from "@/hooks/user/useAuthInputValidation";
import { useUserUpdate } from "@/hooks/user/useUserUpdate";
import { useUserStore } from "@/store/userStore";

interface AccountEditModalProps {
    buttonLabel: string;
    email: string;
    onClose: () => void;
}

export default function AccountEditModal({ buttonLabel, email, onClose }: AccountEditModalProps) {
    const [nickname, setNickname] = useState("");

    const userUpdateMutation = useUserUpdate();
    const updateNickname = useUserStore((state) => state.updateNickname);

    const {
        // 에러 메시지
        nicknameError,

        // 성공 메시지
        nicknameSuccess,

        // 중복 체크 여부
        nicknameChecked,

        // actions
        validateUserUpdate,
        clearFieldError,
        clearFieldSuccess,
        resetDuplicateStatus,
        checkDuplicateField,
    } = useAuthInputValidation();

    async function handleUserUdate(e?: React.FormEvent) {
        if (e) e.preventDefault();

        const isValid = validateUserUpdate({
            nickname,
        });

        if (!isValid) return;

        try {
            const response = await userUpdateMutation.mutateAsync({
                nickname,
            });

            if (response.success) {
                updateNickname(nickname);
                onClose();

            } else {
                console.log("수정 실패: ", response.code);
            }

        } catch (error) {
            console.error("회원 정보 수정 API 오류:", error);
        }
    }

    return (
        <div className="flex flex-col gap-5 my-5">
            <AuthInput
                label={"이메일"}
                type={"text"}
                value={email}
                disabled
                className="bg-gray-100 text-gray-500"
            />
            <AuthInput
                label={"닉네임"}
                type={"text"}
                value={nickname}
                placeholder="사용하실 닉네임을 입력해주세요"
                checkDuplicate
                onChange={(e) => {
                    setNickname(e.target.value);
                    clearFieldError("nickname");
                    clearFieldSuccess("nickname");
                    resetDuplicateStatus("nickname");
                }}
                onDuplicateCheck={() => checkDuplicateField("nickname", nickname)}
                errorMessage={nicknameError}
                successMessage={nicknameSuccess}
                isDuplicateChecked={nicknameChecked}
            />
            {/* 모달 버튼 */}
            <PrimaryButton
                onClick={handleUserUdate}
                label={buttonLabel}
            />
        </div>
    );
}