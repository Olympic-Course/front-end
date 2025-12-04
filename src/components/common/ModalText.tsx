import PrimaryButton from "./PrimaryButton";

interface ModalTextProps {
    text: string;
    buttonClick?: () => void;
    buttonLabel: string;
}

export default function ModalText({ text, buttonClick, buttonLabel }: ModalTextProps) {
    return (
        <div className="flex flex-col gap-5">
            <span className="flex justify-center w-full text-sm text-gray-500 font-medium">
                {text}
            </span>
            {/* 모달 버튼 */}
            <PrimaryButton
                onClick={buttonClick}
                label={buttonLabel}
            />
        </div>
    );
}