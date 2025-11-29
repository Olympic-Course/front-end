interface SecondaryButtonProps {
    onClick: () => void;
    label: string;
}

export default function SecondaryButton({ onClick, label }: SecondaryButtonProps){
    return(
        <button
            type="button"
            onClick={onClick}
            className="text-xs w-full font-semibold py-2 rounded-md border border-(--color-main) text-(--color-main)"
        >
            {label}
        </button>
    );
}