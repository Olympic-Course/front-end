import AuthInput from "../AuthInput";

export default function AccountDeleteModal() {
    return (
        <div className="flex flex-col gap-5">
            <p className="text-gray-500 text-sm text-center leading-relaxed">
                계정을 삭제하면 모든 정보가 사라집니다. <br />
                삭제를 원하신다면 비밀번호를 입력해주세요.
            </p>
            <AuthInput
                label={"현재 비밀번호 확인"}
                type={"password"}
            />
        </div>
    );
}