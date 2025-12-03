import InputCheckButton from "./InputCheckButton";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    checkDuplicate?: boolean; // 중복 버튼
    passWordCheck?: boolean; //비밀번호 확인 버튼
    successMessage?: string; //성공메세지
    errorMessage?: string; //에러메세지
    type: string;
    onDuplicateCheck?: () => void;
    isDuplicateChecked?: boolean;
}

export default function AuthInput({
    label,
    required = false,
    checkDuplicate = false,
    passWordCheck = false,
    successMessage,
    errorMessage,
    className,
    onDuplicateCheck,
    isDuplicateChecked,
    ...props
}: AuthInputProps) {

    return (
        <div className="flex flex-col items-start justify-start gap-1 h-[90px]">
            <label className="text-sm font-medium flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}

            </label>
            <div className="relative w-full">
                <input
                    {...props}
                    className={
                        `w-full p-3 border border-gray-100 rounded-lg text-sm font-medium focus:outline-(--color-main) placeholder:text-gray-300 placeholder:font-medium ${className}`
                    }
                />
                {checkDuplicate && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <InputCheckButton
                            onClick={onDuplicateCheck}
                            disabled={isDuplicateChecked}
                        />
                    </div>
                )}

                {passWordCheck && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <InputCheckButton
                            onClick={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                            label="확인"
                        />
                    </div>
                )}
            </div>
            {/* 성공 메세지 */}
            {successMessage && (
                <span className="text-[10px] text-green-500 font-medium">
                    {successMessage}
                </span>
            )}

            {/* 에러 메세지 */}
            {errorMessage && (
                <span className="text-[10px] text-red-500 font-medium">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}