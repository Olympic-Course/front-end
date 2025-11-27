interface UserSettingListProps {      // 아이콘 컴포넌트
    label: string;          // 메뉴 이름
    onClick: () => void;     // 클릭 이벤트
}

export default function UserSettingList({ label, onClick }: UserSettingListProps) {
    return (
        <button
            onClick={onClick}
            className="p-3 text-left text-sm font-medium active:bg-gray-100 transition-all duration-150"
        >
            {label}
        </button>
    );
}