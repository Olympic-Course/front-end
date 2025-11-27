import { Heart } from "lucide-react";

interface LikeIconProps {
    liked: boolean; 
    count: number;
}

export default function LikeIcon({ liked, count }: LikeIconProps){
    return(
        <div className="flex flex-col items-center">
            <button>
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