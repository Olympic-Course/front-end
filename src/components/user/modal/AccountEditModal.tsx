import AuthInput from "../AuthInput";

export default function AccountEditModal() {
    return (
        <div className="flex flex-col gap-5 my-5">
            <AuthInput
                label={"이메일"}
                type={"text"}
                value={"yoonj310@gmail.com"}
                disabled
                className="bg-gray-100 text-gray-500"
            />
            <AuthInput
                label={"닉네임"}
                type={"text"}
                placeholder="사용하실 닉네임을 입력해주세요"
                rightAddon
            />
        </div>
    );
}