import { X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

interface ModalProps {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    buttonLabel: string;
}

export default function Modal({ onClose, title, children, buttonLabel }: ModalProps) {
    return (
        <div
            className="w-full fixed inset-0 bg-black/50 flex justify-center items-center z-20"
        >
            <div
                className="w-4/5 max-w-sm bg-white p-5 rounded-2xl flex flex-col items-center gap-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col w-full">
                    {/* 엑스버튼 */}
                    <button
                        onClick={onClose}
                        className="w-full flex justify-end"
                    >
                        <X strokeWidth={1}/>
                    </button>

                    {/* 모달 타이틀 */}
                    <span className="text-center text-base font-bold">{title}</span>
                </div>

                {/* 모달 내부 콘텐츠 */}
                <div className="w-full">{children}</div>

                {/* 모달 버튼 */}
                <PrimaryButton
                    onClick={onClose}
                    label={buttonLabel}
                />
            </div>
        </div>
    );
}