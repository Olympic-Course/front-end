import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className="flex w-full border border-(--color-searchBarBorder) rounded-full py-3 px-5 justify-between">
            <input
                type="text"
                className="w-full text-sm font-medium focus:outline-none placeholder:text-gray-300 placeholder:font-medium"
                placeholder="검색어를 입력해주세요"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={onSubmit}
            >
                <Search color="#666666" />
            </button>
        </div>
    );
}