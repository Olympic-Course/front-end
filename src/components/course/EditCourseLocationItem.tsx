import { TextAlignJustify, X } from "lucide-react";
import CourseLocationMemo from "./CourseLocationMemo";

interface EditCourseLocationItemProps {
    stepOrder: number;
    name: string;
    onClick?: () => void;
}

export default function EditCourseLocationItem({ stepOrder, name, onClick }: EditCourseLocationItemProps) {
    return (
        <div className="flex flex-col w-full gap-1">
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
                        onClick={onClick}
                    >
                        <X color="#FF383C" size={20} />
                    </button>
                </div>
                <TextAlignJustify color="#828282" size={20} />
            </div>
            {/* {memoActive && (
                <CourseLocationMemo
                    locationMemo={"춥거나 더울때는 소마미술관으로 대피🚨"}
                />
            )} */}
        </div>
    );
}