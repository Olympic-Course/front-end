interface OptionSelectButtonProps {
    option: string;
    active: boolean;
    onClick?: () => void;
}

export default function OptionSelectButton({ option, active, onClick }: OptionSelectButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                items-centerrounded-md text-[11px] font-semibold w-full p-2 rounded-xl
                ${active
                    ? "bg-(--color-main) text-white"
                    : "bg-[#F7F7F7] text-[#CCCCCC]" 
                }
            `}
        >
            {option}
        </button>
    );
}