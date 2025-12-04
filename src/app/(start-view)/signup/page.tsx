"use client";

import AuthInput from "@/components/user/AuthInput"
import PrimaryButton from "@/components/common/PrimaryButton"
import LanguageSelector from "@/components/user/LanguageSelector";
import useAuthInputValidation from "@/hooks/user/useAuthInputValidation";
import { useState } from "react";
import { useSignup } from "@/hooks/auth/useSignup";
import Modal from "@/components/common/Modal";
import { useRouter } from 'next/navigation';
import ModalText from "@/components/common/ModalText";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  // const [language, setLanguage] = useState("ko");

  const [showResultModal, setShowResultModal] = useState(false);

  const signupMutation = useSignup();

  const {
    // 에러 메시지
    emailError,
    nicknameError,
    passwordError,
    passwordCheckError,

    // 성공 메시지
    emailSuccess,
    nicknameSuccess,

    // 중복 체크 여부
    emailChecked,
    nicknameChecked,

    // actions
    validateSignup,
    clearFieldError,
    clearFieldSuccess,
    resetDuplicateStatus,
    checkDuplicateField,
  } = useAuthInputValidation();

  async function handleSignup(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const isValid = validateSignup({
      email,
      nickname,
      password,
      passwordCheck,
    });

    if (!isValid) return;

    try {
      const response = await signupMutation.mutateAsync({
        email,
        nickname,
        password,
      });

      if (response.success) {
        setShowResultModal(true);
      } else {
        console.log("회원가입 실패: ", response.code);
      }

    } catch (error) {
      console.error("회원가입 API 오류:", error);
    }
  }

  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-lg font-bold text-center">
        회원가입
      </h1>

      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일을 입력하세요"
          required
          checkDuplicate
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError("email");
            clearFieldSuccess("email");
            resetDuplicateStatus("email");
          }}
          onDuplicateCheck={() => checkDuplicateField("email", email)}
          errorMessage={emailError}
          successMessage={emailSuccess}
          isDuplicateChecked={emailChecked}
        />
        <AuthInput
          label="닉네임"
          type="text"
          value={nickname}
          placeholder="닉네임을 입력하세요"
          required
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
        <AuthInput
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
          errorMessage={passwordError}
        />
        <AuthInput
          label="비밀번호 확인"
          type="password"
          value={passwordCheck}
          placeholder="비밀번호를 다시 입력하세요"
          required
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            clearFieldError("passwordCheck");
          }}
          errorMessage={passwordCheckError}
        />

        {/* 언어 선택 영역은 추후 구현 예정 */}
        {/* <LanguageSelector
          selectedLanguage={language}
          onChangeLanguage={setLanguage}
        /> */}

        <div className="flex justify-center mt-2">
          <PrimaryButton
            label="회원가입"
            onClick={handleSignup}
          />
        </div>
      </form>

      {/* 회원가입 성공 모달 표시 */}
      {showResultModal && (
        <Modal
          title="회원가입 성공"
          onClose={() => router.push("/")}
        >
          <ModalText
            text={"회원가입이 완료되었습니다."}
            buttonClick={() => router.push("/")}
            buttonLabel="로그인 하러가기"
          />
        </Modal>
      )}
    </div>
  );
}
