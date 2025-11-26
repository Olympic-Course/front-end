import AuthInput from "@/components/user/AuthInput"

export default function Page() {
  return (
    <div className="flex flex-col justify-start gap-7">
      <h1 className="text-xl font-bold text-center">
        안녕하세요 !
      </h1>
      <AuthInput
        label="이메일"
        type="text"
        required
        placeholder="이메일을 입력하세요"
        rightAddon
      />
      <AuthInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
    </div>
  )
}
