import { Pencil, Trash2 } from "lucide-react";

interface CourseActionButtonsProps {
    type: "edit" | "delete";
    onClick?: () => void;
}

export default function CourseActionButtons({ type, onClick }: CourseActionButtonsProps) {

    const isEdit = type === "edit";

    const Icon = isEdit ? Pencil : Trash2;
    const label = isEdit ? "수정" : "삭제";

    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center"
        >
            <Icon size={22} color="#989898" />
            <span className="text-[11px] text-[#989898]">{label}</span>
        </button>
    );
}