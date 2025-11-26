import { Check } from "lucide-react";

interface LanguageItemProps {
    language: string;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function LanguageItem({
    label,
    selected,
    onClick,
}: LanguageItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full h-8 text-xs p-2 rounded-md flex justify-between items-center
                ${selected ? "bg-gray-100 text-(--color-main) font-semibold" : "bg-white font-normal"}
            `}
        >
            <span>{label}</span>
            {selected && <span className="text-(--color-main) font-bold"><Check className="w-4 h-4" /></span>}
        </button>
    );
}