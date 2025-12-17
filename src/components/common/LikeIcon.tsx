import { Heart } from "lucide-react";

interface LikeIconProps {
    liked: boolean;
    count: number;
    onClick?: () => void;
}

export default function LikeIcon({ liked, count, onClick }: LikeIconProps) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={(e) => {
                    e.preventDefault();   // Link 이동 막기
                    e.stopPropagation();  // 상위로 이벤트 전파 차단
                    onClick?.();
                }}
            >
                <Heart
                    className="w-5 h-5"
                    fill={liked ? "#FF5252" : "none"}
                    stroke={liked ? "#FF5252" : "#BFBFBF"}
                />
            </button>
            <span className="text-[9px] font-semibold text-center">{count}</span>
        </div>
    );
}