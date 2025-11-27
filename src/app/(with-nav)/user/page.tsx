'use client';

import { FileText, Heart } from "lucide-react";
import PrimaryButton from "@/components/common/PrimaryButton";
import UserCourseList from "@/components/user/UserCourseList";
import UserSettingList from "@/components/user/UserSettingList";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Modal from "@/components/common/Modal";

export default function Page() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // 실제 로그인 요청 처리
    console.log("로그아웃 요청");
  }

  return (
    <div className="flex flex-col h-full px-10 py-6 justify-center items-center gap-5">
      {/* 닉네임 및 이메일 */}
      <div className="w-full flex justify-start items-end gap-3">
        <span className="text-xl font-bold">닉네임</span>
        <span className="text-sm font-medium text-gray-200">yoonj310@gmail.com</span>
      </div>

      {/* 작성글 및 좋아요 */}
      <div className="w-full flex gap-5">
        <div className="flex-1">
          <UserCourseList icon={FileText} label="작성글" count={8} href="/user/posts" />
        </div>
        <div className="flex-1">
          <UserCourseList icon={Heart} label="좋아요" count={12} href="/user/likes" />
        </div>
      </div>

      {/* 설정 메뉴 리스트 */}
      <div className="flex flex-col w-full py-3 border-t border-b border-gray-200">
        <UserSettingList
          label={"회원 정보 수정"}
          onClick={() => router.push("/user/edit")}
        />
        <UserSettingList
          label={"비밀번호 변경"}
          onClick={() => setShowModal(true)}
        />
        <UserSettingList
          label={"계정탈퇴"}
          onClick={() => router.push("/user")}
        />
      </div>

      {/* 로그아웃 버튼 */}
      <div className="flex justify-center mt-2">
        <PrimaryButton
          label="로그아웃"
          onClick={handleSubmit}
        />
      </div>

      {/* 모달 표시 */}
      {showModal && (
        <Modal
          title="비밀번호 변경"
          buttonLabel="저장"
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col justify-start items-center my-3 bg-amber-200">
            콘텐츠 영역
          </div>
        </Modal>
      )}
    </div>
  )
}
