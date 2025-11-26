"use client";

import PrimaryButton from "@/components/common/PrimaryButton";
import LanguageSelector from "@/components/user/LanguageSelector";
import { useState } from "react";

export default function Page() {
  const [language, setLanguage] = useState("ko");

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // 실제 회원가입 요청 처리
    console.log("언어 선택 및 서비스 시작:", { language });
  }
  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-xl font-bold text-center">
        비회원 언어 선택
      </h1>

      <LanguageSelector
        selectedLanguage={language}
        onChangeLanguage={setLanguage}
      />

      <div className="flex justify-center mt-2">
        <PrimaryButton
          label="시작!"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}