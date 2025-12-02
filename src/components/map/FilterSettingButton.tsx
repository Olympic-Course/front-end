import { Eye, EyeOff, SlidersHorizontal } from "lucide-react";

interface FilterSettingButtonProps {
    type: "filter" | "pinOn" | "pinOff";
    onClick?: () => void;
}

export default function FilterSettingButton({ type, onClick }: FilterSettingButtonProps) {

    const Icon =
        type === "filter"
            ? SlidersHorizontal
            : type === "pinOn"
                ? Eye
                : EyeOff;

    return (
        <button
            className="border border-[#8E8E93] rounded-full bg-white p-2"
            onClick={onClick}
        >
            <Icon size={20} color="#8E8E93" />
        </button>


    );
}