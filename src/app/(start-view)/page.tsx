"use client";

import AuthInput from "@/components/user/AuthInput"
import PrimaryButton from "@/components/common/PrimaryButton"
import LinkButton from "@/components/user/LinkButton";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // 실제 로그인 요청 처리
    console.log("로그인 요청:", { email, password });
  }

  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-xl font-bold text-center">
        안녕하세요!
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일을 입력하세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-evenly">
          <LinkButton href="/guest_laguage_select" label="비회원으로 즐기기" />
          <LinkButton href="/signup" label="아직 회원이 아니신가요?" />
        </div>

        <div className="flex justify-center mt-2">
          <PrimaryButton
            label="로그인"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}
