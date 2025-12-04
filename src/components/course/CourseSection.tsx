import CourseLocationItem from "./CourseLocationItem";
import CourseLocationMemo from "./CourseLocationMemo";

interface CourseSectionProps {
    stepOrder: number;
    name: string;
    memoActive: boolean;
    description: string;
    photos: string[];
    thumbnail: string | null;
    onSelectThumbnail: (photoUrl: string) => void;
    onClick: () => void;
}

export default function CourseSection({
    stepOrder,
    name,
    memoActive,
    description,
    photos,
    thumbnail,
    onSelectThumbnail,
    onClick
}: CourseSectionProps) {
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
                    locationMemo={description}
                    photos={photos}
                    thumbnail={thumbnail}
                    onSelectThumbnail={onSelectThumbnail}
                />
            )}
        </div>
    );
}