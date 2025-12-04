import { checkDuplicate, passwordCheck } from "@/api/user";
import { CheckDuplicateRequest, PasswordCheckRequest } from "@/types/user"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function useAuthInputValidation() {
    // 에러 메시지
    const [emailError, setEmailError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");


    // 성공 메시지
    const [emailSuccess, setEmailSuccess] = useState("");
    const [nicknameSuccess, setNicknameSuccess] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // 중복 체크 여부
    const [emailChecked, setEmailChecked] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);

    // 현재 비밀번호 체크 여부
    const [passwordChecked, setPasswordChecked] = useState(false);

    // 모든 에러 초기화
    function resetErrors() {
        setEmailError("");
        setNicknameError("");
        setPasswordError("");
        setPasswordCheckError("");
        setCurrentPasswordError("");
    }

    // 개별 에러 초기화 함수
    function clearFieldError(field: "email" | "nickname" | "password" | "passwordCheck" | "currentPassword") {
        if (field === "email") setEmailError("");
        if (field === "nickname") setNicknameError("");
        if (field === "password") setPasswordError("");
        if (field === "passwordCheck") setPasswordCheckError("");
        if (field === "currentPassword") setCurrentPasswordError("");
    }

    // 이메일 및 닉네임 성공메세지 초기화 함수
    function clearFieldSuccess(field: "email" | "nickname" | "password") {
        if (field === "email") setEmailSuccess("");
        if (field === "nickname") setNicknameSuccess("");
        if (field === "password") setPasswordSuccess("");
    }

    // 중복 체크 여부 초기화
    function resetDuplicateStatus(field: "email" | "nickname") {
        if (field === "email") setEmailChecked(false);
        if (field === "nickname") setNicknameChecked(false);
    }

    // 현재 비밀번호 체크 여부 초기화
    function resetPasswordCheckStatus() {
        setPasswordChecked(false);
        setCurrentPasswordError("");
        setPasswordSuccess("");
    }

    // 중복 체크 mutation
    const duplicateMutation = useMutation({
        mutationFn: (payload: CheckDuplicateRequest) => checkDuplicate(payload),
    });

    // 이메일/닉네임 중복 체크 함수
    async function checkDuplicateField(type: "email" | "nickname", value: string) {
        // 메시지 초기화
        if (type === "email") {
            setEmailError("");
            setEmailSuccess("");
            setEmailChecked(false);
        } else {
            setNicknameError("");
            setNicknameSuccess("");
            setNicknameChecked(false);
        }

        if (value.trim() === "") {
            if (type === "email") {
                setEmailError("내용을 입력해주세요.");
            } else {
                setNicknameError("내용을 입력해주세요.");
            }
            return false;
        }

        try {
            const response = await duplicateMutation.mutateAsync({
                type,
                content: value,
            });

            if (response.success) {
                if (type === "email") {
                    setEmailSuccess("사용 가능한 이메일입니다.");
                    setEmailChecked(true);
                } else {
                    setNicknameSuccess("사용 가능한 닉네임입니다.");
                    setNicknameChecked(true);
                }
                return true;
            } else {
                if (type === "email") {
                    setEmailError("이미 사용 중인 이메일입니다.");
                } else {
                    setNicknameError("이미 사용 중인 닉네임입니다.");
                }
                return false;
            }
        } catch (error: unknown) {
            const axiosError = error as { response?: { status?: number } };

            if (axiosError.response?.status === 409) {
                if (type === "email") {
                    setEmailError("이미 사용 중인 이메일입니다.");
                    setEmailChecked(false);
                } else {
                    setNicknameError("이미 사용 중인 닉네임입니다.");
                    setNicknameChecked(false);
                }
                return false;
            }

            // 그 외의 진짜 에러
            if (type === "email") {
                setEmailError("중복 확인 요청에 실패했습니다.");
            } else {
                setNicknameError("중복 확인 요청에 실패했습니다.");
            }
            return false;
        }
    }

    // 현재 비밀번호 체크 mutation
    const passwordMutation = useMutation({
        mutationFn: (payload: PasswordCheckRequest) => passwordCheck(payload),
    });

    // 현재 비밀번호 체크 함수
    async function passwordCheckField(curPassword: string) {
        // 메시지 초기화
        setCurrentPasswordError("");
        setPasswordSuccess("");
        setPasswordChecked(false);

        if (curPassword.trim() === "") {
            setCurrentPasswordError("내용을 입력해주세요.");
            return false;
        }

        try {
            const response = await passwordMutation.mutateAsync({
                curPassword,
            });

            if (response.success) {
                setPasswordSuccess("현재 비밀번호가 확인되었습니다.");
                setPasswordChecked(true);
                return true;
            } else {
                setCurrentPasswordError("비밀번호가 일치하지 않습니다.");
                setPasswordChecked(false);
                return false;
            }
        } catch (error: unknown) {
            const axiosError = error as { response?: { status?: number } };

            if (axiosError.response?.status === 400) {
                setCurrentPasswordError("비밀번호가 일치하지 않습니다.");
                setPasswordChecked(false);
                return false;
            }

            setPasswordError("비밀번호 확인 요청에 실패했습니다.");
            setPasswordChecked(false);
            return false;
        }
    }


    // validation 실행 함수

    // validateSignup : 회원가입 시 검증 절차
    function validateSignup({ email, nickname, password, passwordCheck }: {
        email: string;
        nickname: string;
        password: string;
        passwordCheck: string;
    }) {
        resetErrors();

        let hasError = false;

        const validations = [
            { value: email, setter: setEmailError },
            { value: nickname, setter: setNicknameError },
            { value: password, setter: setPasswordError },
            { value: passwordCheck, setter: setPasswordCheckError },
        ];

        // 1) 빈값 체크
        validations.forEach(({ value, setter }) => {
            if (value.trim() === "") {
                setter("내용을 입력해주세요.");
                hasError = true;
            }
        });

        if (hasError) return false;

        // 2) 비밀번호 일치 검증
        if (password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            return false;
        }

        // 3) 중복 체크 여부 확인
        let duplicateError = false;

        if (!emailChecked) {
            setEmailError("중복 확인을 해주세요.");
            duplicateError = true;
        }

        if (!nicknameChecked) {
            setNicknameError("중복 확인을 해주세요.");
            duplicateError = true;
        }

        if (duplicateError) return false;

        return true; // 모든 validation 통과

    }

    //validatePasswordUpdate : 비밀번호 변경 시 검증 절차
    function validatePasswordUpdate({
        currentPassword,
        password,
        passwordCheck,
    }: {
        currentPassword: string;
        password: string;
        passwordCheck: string;
    }) {
        resetErrors();

        let hasError = false;

        // 1) 빈값 체크
        const validations = [
            { value: currentPassword, setter: setCurrentPasswordError },
            { value: password, setter: setPasswordError },
            { value: passwordCheck, setter: setPasswordCheckError },
        ];

        validations.forEach(({ value, setter }) => {
            if (value.trim() === "") {
                setter("내용을 입력해주세요.");
                hasError = true;
            }
        });

        if (hasError) return false;

        // 2) 새 비밀번호 일치 검증
        if (password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            return false;
        }

        // 3) 현재 비밀번호 확인 여부 확인
        if (!passwordChecked) {
            setCurrentPasswordError("현재 비밀번호를 확인해주세요.");
            return false;
        }

        return true; // 모든 검증 통과
    }

    //validateUserUdate : 유저 정보 변경 시 검증 절차
    function validateUserUpdate({ nickname }: {
        nickname: string;
    }) {
        resetErrors();

        let hasError = false;

        if (nickname.trim() === "") {
            setCurrentPasswordError("내용을 입력해주세요.");
            hasError = true;
        }

        if (hasError) return false;


        // 3) 중복 체크 여부 확인
        let duplicateError = false;

        if (!nicknameChecked) {
            setNicknameError("중복 확인을 해주세요.");
            duplicateError = true;
        }

        if (duplicateError) return false;

        return true; // 모든 validation 통과

    }

    //validatePasswordUpdate : 비밀번호 변경 시 검증 절차
    function validateDeleteUser({
        currentPassword,
    }: {
        currentPassword: string;
    }) {
        resetErrors();

        let hasError = false;

        // 1) 빈값 체크
        if (currentPassword.trim() === "") {
            setCurrentPasswordError("내용을 입력해주세요.");
            hasError = true;
        }

        if (hasError) return false;

        // 2) 현재 비밀번호 확인 여부 확인
        if (!passwordChecked) {
            setCurrentPasswordError("현재 비밀번호를 확인해주세요.");
            return false;
        }

        return true; // 모든 검증 통과
    }

    return {
        // 에러 메시지
        emailError,
        nicknameError,
        passwordError,
        passwordCheckError,
        currentPasswordError,

        // 성공 메시지
        emailSuccess,
        nicknameSuccess,
        passwordSuccess,

        // 중복 체크 여부
        emailChecked,
        nicknameChecked,

        // 현재 비밀번호 체크 여부
        passwordChecked,

        // 검증
        validateSignup,
        validatePasswordUpdate,
        validateUserUpdate,
        validateDeleteUser,

        // action
        clearFieldError,
        clearFieldSuccess,
        resetDuplicateStatus,
        resetPasswordCheckStatus,
        checkDuplicateField,
        passwordCheckField,
    };
}