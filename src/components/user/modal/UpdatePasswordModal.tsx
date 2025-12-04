"use client"

import { useState } from "react";
import AuthInput from "../AuthInput";
import useAuthInputValidation from "@/hooks/user/useAuthInputValidation";
import { usePasswordUpdate } from "@/hooks/user/usePasswordUpdate";
import PrimaryButton from "@/components/common/PrimaryButton";

interface UpdatePasswordModalProps {
    buttonLabel: string;
    onClose: () => void;
}

export default function UpdatePasswordModal({ buttonLabel, onClose }: UpdatePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const passwordUpdateMutation = usePasswordUpdate();

    const {
        // 에러 메시지
        currentPasswordError,
        passwordError,
        passwordCheckError,

        // 성공 메시지
        passwordSuccess,

        // 현재 비밀번호 체크 여부
        passwordChecked,

        // actions
        validatePasswordUpdate,
        clearFieldError,
        clearFieldSuccess,
        resetPasswordCheckStatus,
        passwordCheckField,
    } = useAuthInputValidation();


    async function handlePasswordUpdate(e?: React.FormEvent) {
        if (e) e.preventDefault();

        const isValid = validatePasswordUpdate({
            currentPassword,
            password,
            passwordCheck,
        });

        if (!isValid) return;

        try {
            const response = await passwordUpdateMutation.mutateAsync({
                newPassword: password,
            });

            if (response.success) {
                console.log("비밀번호 변경 성공: ", response.code);
                onClose();

            } else {
                console.log("비밀번호 변경 실패: ", response.code);
            }
        } catch (error) {
            console.error("비밀번호 변경 API 오류:", error);
        }
    }


    return (
        <div className="flex flex-col gap-5 my-5">
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
            <AuthInput
                label={"새 비밀번호"}
                type={"password"}
                value={password}
                placeholder="새 비밀번호를 입력해주세요"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                errorMessage={passwordError}
            />
            <AuthInput
                label={"새 비밀번호 확인"}
                type={"password"}
                value={passwordCheck}
                placeholder="새 비밀번호를 한번 더 입력해주세요"
                onChange={(e) => {
                    setPasswordCheck(e.target.value);
                }}
                errorMessage={passwordCheckError}
            />
            {/* 모달 버튼 */}
            <PrimaryButton
                onClick={handlePasswordUpdate}
                label={buttonLabel}
            />
        </div>
    );
}