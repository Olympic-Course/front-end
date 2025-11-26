interface PrimaryButtonProps {
    onClick: () => void;
    label: string;
}

export default function PrimaryButton({ onClick, label }: PrimaryButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-sm font-semibold px-8 py-3 rounded-md bg-(--color-main) text-white"
        >
            {label}
        </button>
    );
}
