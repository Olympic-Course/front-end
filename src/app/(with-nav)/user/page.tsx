'use client';

import { FileText, Heart } from "lucide-react";
import PrimaryButton from "@/components/common/PrimaryButton";
import UserSettingList from "@/components/user/UserSettingList";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import UpdatePasswordModal from "@/components/user/modal/UpdatePasswordModal";
import AccountDeleteModal from "@/components/user/modal/AccountDeleteModal";
import LogoutConfirmModal from "@/components/user/modal/LogoutConfirmModal";
import AccountEditModal from "@/components/user/modal/AccountEditModal";
import UserCourseButton from "@/components/user/UserCourseButtom";
import { useLogout } from "@/hooks/auth/useLogout";
import ModalText from "@/components/common/ModalText";
import { useUserGet } from "@/hooks/user/useUserGet";
import { useUserStore } from "@/store/userStore";

export default function Page() {
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const { mutate: logoutMutate } = useLogout();

  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const [showAccountEditModal, setShowAccountEditModal] = useState(false);

  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  const [showUserUpdateSuccessModal, setShowUserUpdateSuccessModal] = useState(false);
  const [showDeleteUserSuccessModal, setShowDeleteUserSuccessModal] = useState(false);

  const nickname = useUserStore((s) => s.nickname);
  const email = useUserStore((s) => s.email);

  useEffect(() => {
    // 1. persist 이벤트 리스너
    const unsub = useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // 2. 혹시 이미 hydrated 되어 있으면 즉시 true
    if (useUserStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    // 3. Fallback: 500ms 후에도 hydrated false면 강제로 true 처리
    // (Zustand skipHydration 버그 대응)
    const timeout = setTimeout(() => {
      if (!useUserStore.persist.hasHydrated()) {
        console.warn("[ZUSTAND] hydration fallback triggered");
        setHydrated(true);
      }
    }, 500);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);


  // Zustand 로그인 여부
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  const query = useUserGet(hydrated && isLoggedIn);
  const { data, isLoading, isError, refetch } = query;

  if (!hydrated) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-400"></div>
      </div>
    );
  }

  console.log(`로그인 여부 : ${isLoggedIn}`)

  // 1. 로그인되지 않았다면 SSR mismatch를 피하기 위해 즉시 CSR 결과 return
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500">로그인이 필요한 페이지입니다.</p>
        <PrimaryButton
          label="로그인 하러가기"
          onClick={() => router.push("/")}
        />
      </div>
    );
  }

  // 3. 로딩 화면 (하이드레이션 오류 방지)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-400"></div>
        <span className="mt-3 text-gray-400">불러오는 중...</span>
      </div>
    );
  }

  // 4. 에러 처리 (토큰 만료 등)
  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500">사용자 정보를 불러오지 못했습니다.</p>
        <PrimaryButton label="다시 시도하기" onClick={() => refetch()} />
      </div>
    );
  }

  // 5. 실제 유저 정보
  const user = data.data;

  function handleLogout() {
    logoutMutate(undefined, {
      onSuccess: () => {
        router.push("/user");
      },
    });
  }

  return (
    <div className="flex flex-col h-full px-10 py-6 justify-center items-center gap-5">
      {/* 닉네임 및 이메일 */}
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <span className="text-xl font-bold">{nickname}</span>
        <span className="text-sm font-medium text-gray-300">{email}</span>
      </div>

      {/* 작성글 및 좋아요 */}
      <div className="w-full flex gap-5">
        <div className="flex-1">
          <UserCourseButton icon={FileText} label="작성글" count={user.postCount} href="/user/posts" />
        </div>
        <div className="flex-1">
          <UserCourseButton icon={Heart} label="좋아요" count={user.likedPostCount} href="/user/likes" />
        </div>
      </div>

      {/* 설정 메뉴 리스트 */}
      <div className="flex flex-col w-full py-3 border-t border-b border-gray-200">
        <UserSettingList
          label={"회원 정보 수정"}
          onClick={() => setShowAccountEditModal(true)}
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

      {/* 회원 정보 수정 모달 표시 */}
      {showAccountEditModal && (
        <Modal
          title="회원 정보 수정"
          onClose={() => setShowAccountEditModal(false)}
        >
          <AccountEditModal
            buttonLabel="저장"
            email={user.email}
            onClose={() => {
              setShowAccountEditModal(false);  // 기존 모달 닫기
              setShowUserUpdateSuccessModal(true);  // 성공 모달 열기
            }}
          />
        </Modal>
      )}

      {/* 비밀번호 변경 모달 표시 */}
      {showUpdatePasswordModal && (
        <Modal
          title="비밀번호 변경"
          onClose={() => setShowUpdatePasswordModal(false)}
        >
          <UpdatePasswordModal
            buttonLabel="변경"
            onClose={() => {
              setShowUpdatePasswordModal(false);  // 기존 모달 닫기
              setShowPasswordSuccessModal(true);  // 성공 모달 열기
            }}
          />
        </Modal>
      )}

      {/* 계정탈퇴 모달 표시 */}
      {showAccountDeleteModal && (
        <Modal
          title="계정탈퇴"
          onClose={() => setShowAccountDeleteModal(false)}
        >
          <AccountDeleteModal
            buttonLabel="탈퇴"
            onClose={() => {
              setShowAccountDeleteModal(false);  // 기존 모달 닫기
              setShowDeleteUserSuccessModal(true);  // 성공 모달 열기
            }}
          />
        </Modal>
      )}

      {/* 로그아웃 모달 표시 */}
      {showLogoutConfirmModal && (
        <Modal
          title="로그아웃"
          onClose={() => setShowLogoutConfirmModal(false)}
        >
          <LogoutConfirmModal
            buttonLabel="로그아웃"
            buttonClick={handleLogout}
          />
        </Modal>
      )}

      {/* 비밀번호 변경 성공 모달 표시 */}
      {showPasswordSuccessModal && (
        <Modal
          title="비밀번호 변경"
          onClose={() => setShowPasswordSuccessModal(false)}
        >
          <ModalText
            text={"비밀번호가 변경되었습니다."}
            buttonClick={() => setShowPasswordSuccessModal(false)}
            buttonLabel="확인"
          />
        </Modal>
      )}

      {/* 회원 정보 변경 성공 모달 표시 */}
      {showUserUpdateSuccessModal && (
        <Modal
          title="회원 정보 수정"
          onClose={() => setShowUserUpdateSuccessModal(false)}
        >
          <ModalText
            text={"회원 정보가 정상적으로 수정되었습니다."}
            buttonClick={() => setShowUserUpdateSuccessModal(false)}
            buttonLabel="확인"
          />
        </Modal>
      )}

      {/* 회원 정보 변경 성공 모달 표시 */}
      {showDeleteUserSuccessModal && (
        <Modal
          title="계정 탈퇴"
          onClose={() => setShowDeleteUserSuccessModal(false)}
        >
          <ModalText
            text={"계정이 삭제되었습니다."}
            buttonClick={() => router.push("/")}
            buttonLabel="확인"
          />
        </Modal>
      )}
    </div>
  )
}
