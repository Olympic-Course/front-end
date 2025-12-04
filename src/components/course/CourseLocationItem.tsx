import { ChevronDown, ChevronRight } from "lucide-react";

interface CourseLocationItemProps {
    stepOrder: number;
    name: string;
    memoActive?: boolean;
    onClick?: () => void;
}

export default function CourseLocationItem({ stepOrder, name, memoActive, onClick }: CourseLocationItemProps) {
    return (
        <div className="flex flex-col w-full gap-1">
            <button
                onClick={onClick}
                className="flex items-center py-1 pl-1 pr-3 rounded-full border border-[#DBDBDB] justify-between gap-2 w-full"
            >
                <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-(--color-main)">
                    <span className="font-medium text-xs text-white">{stepOrder}</span>
                </div>

                <span className="text-sm font-semibold flex-1 text-left">
                    {name}
                </span>

                {memoActive
                    ? <ChevronDown size={25} color="#828282" strokeWidth={1} />
                    : <ChevronRight size={25} color="#828282" strokeWidth={1} />
                }
            </button>
        </div>
    );
}