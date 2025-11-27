import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex w-full border border-(--color-searchBarBorder) rounded-full py-3 px-5 justify-between">
            <input
                type="text"
                className="w-full text-sm font-medium focus:outline-none placeholder:text-gray-300 placeholder:font-medium"
                placeholder="검색어를 입력해주세요"
            />
            <button
            >
                <Search color="#666666"/>
            </button>
        </div>
    );
}