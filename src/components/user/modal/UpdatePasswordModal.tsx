import AuthInput from "../AuthInput";

export default function UpdatePasswordModal() {
    return (
        <div className="flex flex-col gap-5 my-5">
            <AuthInput
                label={"현재 비밀번호 확인"}
                type={"password"}
                placeholder="현재 비밀번호를 입력해주세요"
                passWordCheck
            />
            <AuthInput
                label={"새 비밀번호"}
                type={"password"}
                placeholder="새 비밀번호를 입력해주세요"
            />
            <AuthInput
                label={"새 비밀번호 확인"}
                type={"password"}
                placeholder="새 비밀번호를 한번 더 입력해주세요"
            />
        </div>
    );
}