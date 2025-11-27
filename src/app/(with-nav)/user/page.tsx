"use client";

import { FileText, Heart } from "lucide-react";
import PrimaryButton from "@/components/common/PrimaryButton";
import UserCourseList from "@/components/user/UserCourseList";

export default function Page() {

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // 실제 로그인 요청 처리
    console.log("로그아웃 요청");
  }

  return (
    <div className="flex flex-col p-10 justify-center items-center gap-5">
      <div className="w-full flex justify-start items-end gap-3">
        <span className="text-xl font-bold">닉네임</span>
        <span className="text-sm font-medium text-gray-200">yoonj310@gmail.com</span>
      </div>
      <div className="w-full flex gap-5">
        <div className="flex-1">
          <UserCourseList icon={FileText} label="작성글" count={8} href="/user/posts" />
        </div>
        <div className="flex-1">
          <UserCourseList icon={Heart} label="좋아요" count={12} href="/user/likes" />
        </div>
      </div>

      <div>

      </div>
      <div className="flex justify-center mt-2">
        <PrimaryButton
          label="로그아웃"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}
