import CourseLocationItem from "./CourseLocationItem";
import CourseLocationMemo from "./CourseLocationMemo";

interface CourseSectionProps {
    type: "create" | "detail";
    stepOrder: number;
    name: string;
    memoActive: boolean;
    description?: string;
    photos?: string[];
    thumbnail: string | null;
    onSelectThumbnail: (photoUrl: string) => void;
    onClick: () => void;
}

export default function CourseSection({
    type,
    stepOrder,
    name,
    memoActive,
    description,
    photos,
    thumbnail,
    onSelectThumbnail,
    onClick
}: CourseSectionProps) {
    const hasMemo = Boolean(description) || (photos && photos.length > 0);

    return (
        <div className="flex flex-col w-full gap-1">
            <CourseLocationItem
                stepOrder={stepOrder}
                name={name}
                memoActive={memoActive}
                onClick={hasMemo ? onClick : undefined}
            />
            {memoActive && (
                <CourseLocationMemo
                    type={type}
                    locationMemo={description}
                    photos={photos}
                    thumbnail={thumbnail}
                    onSelectThumbnail={onSelectThumbnail}
                />
            )}
        </div>
    );
}