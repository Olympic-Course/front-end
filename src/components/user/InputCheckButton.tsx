interface InputCheckButtonProps {
    onClick: () => void;
    disabled?: boolean;
    label?: string;
}

export default function InputCheckButton({ onClick, disabled = false, label = "중복" }: InputCheckButtonProps) {
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
