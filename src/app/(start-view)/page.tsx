"use client";

import AuthInput from "@/components/user/AuthInput"
import PrimaryButton from "@/components/common/PrimaryButton"
import LinkButton from "@/components/user/LinkButton";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin"
import { useRouter } from 'next/navigation';
import Modal from "@/components/common/Modal";
import ModalText from "@/components/common/ModalText";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { mutate: loginMutate, isPending, error } = useLogin();

  function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();

    loginMutate(
      { email, password },
      {
        onSuccess: (res) => {
          console.log("로그인 성공", res);
          router.replace("/home");
        },
        onError: () => {
          console.log("로그인 실패");
          setShowErrorModal(true);
        },
      }
    );
  }

  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-xl font-bold text-center">
        안녕하세요!
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col">
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
        </div>

        <div className="flex justify-evenly">
          {/* <LinkButton href="/guest_laguage_select" label="비회원으로 즐기기" /> */}
          <LinkButton href="/home" label="비회원으로 즐기기" />
          <LinkButton href="/signup" label="아직 회원이 아니신가요?" />
        </div>

        <div className="flex justify-center mt-2">
          <PrimaryButton
            label="로그인"
            onClick={handleLogin}
          />
        </div>
      </form>

      {/* 로그인 실패 시 모달 표시 */}
      {showErrorModal && (
        <Modal
          title="로그인 실패"
          onClose={() => setShowErrorModal(false)}
        >
          <ModalText
            text={"로그인 정보를 다시 확인해주세요."}
            buttonLabel="확인"
            buttonClick={() => setShowErrorModal(false)}
          />
        </Modal>
      )}
    </div>
  )
}
