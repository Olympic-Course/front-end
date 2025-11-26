"use client";

import AuthInput from "@/components/user/AuthInput"
import PrimaryButton from "@/components/common/PrimaryButton"
import LanguageSelector from "@/components/user/LanguageSelector";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [language, setLanguage] = useState("");


  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // 실제 회원가입 요청 처리
    console.log("회원가입 요청:", { email, nickname, password, language });
  }

  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-lg font-bold text-center">
        회원가입
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일을 입력하세요"
          required
          rightAddon
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          label="닉네임"
          type="text"
          value={nickname}
          placeholder="닉네임을 입력하세요"
          required
          rightAddon
          onChange={(e) => setNickname(e.target.value)}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"

          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          label="비밀번호 확인"
          type="password"
          value={passwordCheck}
          placeholder="비밀번호를 다시 입력하세요"
          required
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <LanguageSelector
          selectedLanguage={language}
          onChangeLanguage={setLanguage}
        />

        <div className="flex justify-center mt-2">
          <PrimaryButton
            label="회원가입"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
