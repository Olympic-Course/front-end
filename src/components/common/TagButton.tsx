interface TagButtonProps {
    label: string;
    active: boolean;
}

export default function TagButton({ label, active }: TagButtonProps) {
    return (
        <button
            className={
                `rounded-full text-[11px] px-2.5 py-1.5 font-medium ` +
                (active
                    ? "bg-(--color-main) text-white"
                    : "bg-[#F7F7F7] text-[#CCCCCC]")
            }
        >
            {label}
        </button>
    );
}