'use client';

import { FileText, Heart } from "lucide-react";
import PrimaryButton from "@/components/common/PrimaryButton";
import UserCourseList from "@/components/user/UserCourseList";
import UserSettingList from "@/components/user/UserSettingList";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Modal from "@/components/common/Modal";
import UpdatePasswordModal from "@/components/user/modal/UpdatePasswordModal";
import AccountDeleteModal from "@/components/user/modal/AccountDeleteModal";
import LogoutConfirmModal from "@/components/user/modal/LogoutConfirmModal";

export default function Page() {
  const router = useRouter();
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  return (
    <div className="flex flex-col h-full px-10 py-6 justify-center items-center gap-5">
      {/* 닉네임 및 이메일 */}
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <span className="text-xl font-bold">닉네임</span>
        <span className="text-sm font-medium text-gray-300">yoonj310@gmail.com</span>
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
          onClick={() => setShowUpdatePasswordModal(true)}
        />
        <UserSettingList
          label={"계정탈퇴"}
          onClick={() => setShowAccountDeleteModal(true)}
        />
      </div>

      {/* 로그아웃 버튼 */}
      <div className="flex justify-center mt-2">
        <PrimaryButton
          label="로그아웃"
          onClick={() => setShowLogoutConfirmModal(true)}
        />
      </div>

      {/* 비밀번호 변경 모달 표시 */}
      {showUpdatePasswordModal && (
        <Modal
          title="비밀번호 변경"
          buttonLabel="변경"
          onClose={() => setShowUpdatePasswordModal(false)}
        >
          <UpdatePasswordModal />
        </Modal>
      )}

      {/* 계정탈퇴 모달 표시 */}
      {showAccountDeleteModal && (
        <Modal
          title="계정탈퇴"
          buttonLabel="탈퇴"
          onClose={() => setShowAccountDeleteModal(false)}
        >
          <AccountDeleteModal />
        </Modal>
      )}

      {/* 로그아웃 모달 표시 */}
      {showLogoutConfirmModal && (
        <Modal
          title="로그아웃"
          buttonLabel="로그아웃"
          onClose={() => setShowLogoutConfirmModal(false)}
        >
          <LogoutConfirmModal />
        </Modal>
      )}
    </div>
  )
}
