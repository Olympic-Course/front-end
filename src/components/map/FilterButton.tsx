interface FilterButtonProps{
    label: string;
    active: boolean;
    onClick?: () => void;
}

export default function FilterButton({ label, active, onClick }: FilterButtonProps){
    return(
        <button
            onClick={onClick}
            className={
                `rounded-full border text-[11px] px-2.5 py-1.5 font-medium ` +
                (active
                    ? "border-(--color-main) text-(--color-main)"
                    : "border-[#C0C0C0] text-[#666666]")
            }
        >
            {label}
        </button>
    );
}