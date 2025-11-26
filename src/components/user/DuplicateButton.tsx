interface DuplicateButtonProps {
    onClick: () => void;
    disabled?: boolean;
    label?: string;
}

export default function DuplicateButton({ onClick, disabled = false, label = "중복" }: DuplicateButtonProps) {
    return (
        <button
            type="button"
            //onClick={onClick}
            disabled={disabled}
            className="text-xs font-medium px-3.5 py-2 rounded-md bg-(--color-navActive) text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {label}
        </button>
    );
}
