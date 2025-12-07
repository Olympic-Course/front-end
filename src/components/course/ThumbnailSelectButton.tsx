import { CircleCheck } from "lucide-react";

interface ThumbnailSelectButtonProps {
    type: "create" | "detail";
    thumbnailActive: boolean;
    onClick?: () => void;
}

export default function ThumbnailSelectButton({ type, thumbnailActive, onClick }: ThumbnailSelectButtonProps) {

    // ⭐ CASE 1: detail 모드이며 active=false → 아무것도 표시하지 않음
    if (type === "detail" && !thumbnailActive) {
        return null;
    }

    // ⭐ CASE 2: detail 모드이며 active=true → button 대신 div UI만 표시
    if (type === "detail" && thumbnailActive) {
        return (
            <div className="flex w-full justify-end items-center h-6">
                <div
                    className="
                        flex items-center justify-center gap-0.5 rounded-md 
                        bg-[#0088FF] text-white p-1.5
                        text-[10px] font-semibold
                    "
                >
                    <span>대표</span>
                    <CircleCheck size={14} color="white" strokeWidth={2} />
                </div>
            </div>
        );
    }

    // ⭐ CASE 3: create 모드 → 기존 UI 그대로
    return (
        <div className="flex w-full justify-end items-center h-6">
            <button
                onClick={onClick}
                className={`
                    flex items-center justify-center gap-0.5 rounded-md 
                    transition-all duration-300 ease-in-out text-[10px] font-semibold
                    ${thumbnailActive ? "bg-[#0088FF] text-white p-1.5" : ""}
                `}
            >
                {thumbnailActive && (
                    <span className="transition-opacity duration-300 ease-in-out opacity-100">
                        대표
                    </span>
                )}
                <CircleCheck
                    size={thumbnailActive ? 14 : 20}
                    color={thumbnailActive ? "white" : "#828282"}
                    strokeWidth={2}
                />
            </button>
        </div>
    );
}
