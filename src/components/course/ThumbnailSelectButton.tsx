import { CircleCheck } from "lucide-react";

interface ThumbnailSelectButtonProps {
    thumbnailActive: boolean;
    onClick?: () => void;
}

export default function ThumbnailSelectButton({ thumbnailActive, onClick }: ThumbnailSelectButtonProps) {
    return (
        <div className="flex w-full justify-end items-center h-6">
            <button
                onClick={onClick}
                className={`
                flex items-center justify-center gap-0.5 rounded-md 
                transition-all duration-300 ease-in-out text-[10px] font-semibold
                ${thumbnailActive
                        ? "bg-[#0088FF] text-white p-1.5"
                        : ""
                    }
            `}
            >
                {thumbnailActive && <span className="transition-opacity duration-300 ease-in-out opacity-100">대표</span>}
                <CircleCheck
                    size={thumbnailActive ? 14 : 20}
                    color={thumbnailActive ? "white" : "#828282"}
                    strokeWidth={2}
                />
            </button>
        </div>
    );
}