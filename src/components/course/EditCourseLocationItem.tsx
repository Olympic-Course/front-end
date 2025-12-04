import { ChevronDown, ChevronUp, TextAlignJustify, X } from "lucide-react";

interface EditCourseLocationItemProps {
    stepOrder: number;
    name: string;
    onDelete?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
}

export default function EditCourseLocationItem({
    stepOrder,
    name,
    onDelete,
    onMoveUp,
    onMoveDown,
}: EditCourseLocationItemProps) {
    return (
        <div className="flex w-full justify-between items-center gap-3">
            <div
                className="flex items-center py-1 pl-1 pr-3 rounded-full border border-[#DBDBDB] justify-between gap-2 w-full"
            >
                <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-(--color-main)">
                    <span className="font-medium text-xs text-white">{stepOrder}</span>
                </div>

                <span className="text-sm font-semibold flex-1 text-left">
                    {name}
                </span>
                <button
                    onClick={onDelete}
                >
                    <X color="#FF383C" size={20} />
                </button>
            </div>
            <div className="flex flex-col gap-1">
                <button disabled={!onMoveUp} onClick={onMoveUp}>
                    <ChevronUp size={18} color={onMoveUp ? "#000" : "#CCC"} />
                </button>
                <button disabled={!onMoveDown} onClick={onMoveDown}>
                    <ChevronDown size={18} color={onMoveDown ? "#000" : "#CCC"} />
                </button>
            </div>
        </div>
    );
}