import AuthInput from "../AuthInput";

export default function UpdatePasswordModal() {
    return (
        <div className="flex flex-col gap-5 my-5">
            <AuthInput
                label={"현재 비밀번호 확인"}
                type={"password"}
                passWordCheck
            />
            <AuthInput
                label={"새 비밀번호"}
                type={"password"}
            />
            <AuthInput
                label={"새 비밀번호 확인"}
                type={"password"}
            />
        </div>
    );
}