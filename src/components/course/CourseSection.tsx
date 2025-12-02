import CourseLocationItem from "./CourseLocationItem";
import CourseLocationMemo from "./CourseLocationMemo";

interface CourseSectionProps {
    stepOrder: number;
    name: string;
    memoActive?: boolean;
    onClick?: () => void;
}

export default function CourseSection({ stepOrder, name, memoActive, onClick }: CourseSectionProps) {
    return (
        <div className="flex flex-col w-full gap-1">
            <CourseLocationItem
                stepOrder={stepOrder}
                name={name}
                memoActive={memoActive}
                onClick={onClick}
            />
            {memoActive && (
                <CourseLocationMemo
                    locationMemo={"춥거나 더울때는 소마미술관으로 대피🚨"}
                />
            )}
        </div>
    );
}