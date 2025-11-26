import DuplicateButton from "./DuplicateButton";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    type: string;
    rightAddon?: boolean; // 중복 버튼
}

export default function AuthInput({
    label,
    required = false,
    rightAddon = false,
    className,
    ...props
}: AuthInputProps) {

    function onDuplicateCheck(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="flex flex-col items-start justify-start gap-1">
            <label className="text-sm font-medium flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}
                {/* {rightAddon && <span className="ml-1">{rightAddon}</span>} */}
            </label>
            <div className="relative w-full">
                <input
                    {...props}
                    className={
                        "w-full p-3 border border-gray-100 rounded-lg text-sm font-medium focus:outline-(--color-main) placeholder:text-gray-300 placeholder:font-medium"
                    }
                />
                {rightAddon && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <DuplicateButton
                            onClick={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}