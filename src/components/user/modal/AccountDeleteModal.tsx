"use client"

import PrimaryButton from "@/components/common/PrimaryButton";
import AuthInput from "../AuthInput";
import { useState } from "react";
import useAuthInputValidation from "@/hooks/user/useAuthInputValidation";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";

interface AccountDeleteModalProps {
    onClose: () => void;
    buttonLabel: string;
}

export default function AccountDeleteModal({ onClose, buttonLabel }: AccountDeleteModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");

    const deleteUserMutation = useDeleteUser();

    const {
        // 에러 메시지
        currentPasswordError,

        // 성공 메시지
        passwordSuccess,

        // 현재 비밀번호 체크 여부
        passwordChecked,

        // actions
        validateDeleteUser,
        clearFieldError,
        clearFieldSuccess,
        resetPasswordCheckStatus,
        passwordCheckField,
    } = useAuthInputValidation();

    async function handleDeleteUser(e?: React.FormEvent) {
        if (e) e.preventDefault();

        const isValid = validateDeleteUser({
            currentPassword,
        });

        if (!isValid) return;

        try {
            const response = await deleteUserMutation.mutateAsync();

            if (response.success) {
                console.log("회원 탈퇴 성공: ", response.code);
                onClose();

            } else {
                console.log("회원 탈퇴 실패: ", response.code);
            }
        } catch (error) {
            console.error("회원 탈퇴 API 오류:", error);
        }

    }

    return (
        <div className="flex flex-col gap-5">
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                계정을 삭제하면 모든 정보가 사라집니다. <br />
                삭제를 원하신다면 비밀번호를 입력해주세요.
            </p>
            <AuthInput
                label={"현재 비밀번호 확인"}
                type={"password"}
                value={currentPassword}
                placeholder="현재 비밀번호를 입력해주세요"
                passWordCheck
                onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    clearFieldError("currentPassword");
                    clearFieldSuccess("password");
                    resetPasswordCheckStatus();
                }}
                onCurrentPasswordCheck={() => passwordCheckField(currentPassword)}
                errorMessage={currentPasswordError}
                successMessage={passwordSuccess}
                isCurrentPasswordChecked={passwordChecked}
            />
            {/* 모달 버튼 */}
            <PrimaryButton
                onClick={handleDeleteUser}
                label={buttonLabel}
            />
        </div>
    );
}