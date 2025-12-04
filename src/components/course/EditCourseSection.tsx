import EditCourseLocationItem from "./EditCourseLocationItem";
import EditCourseLocationMemo from "./EditCourseLocationMemo";

interface EditCourseSectionProps {
    stepOrder: number;
    name: string;
    description: string;
    photos: string[];
    onChangeDescription: (value: string) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onAddPhoto: (fileName: string) => void;
    onRemovePhoto: (photoIndex: number) => void;
}

export default function EditCourseSection({
    stepOrder,
    name,
    description,
    photos,
    onChangeDescription,
    onDelete,
    onMoveUp,
    onMoveDown,
    onAddPhoto,
    onRemovePhoto
}: EditCourseSectionProps) {
    return (
        <div className="flex flex-col w-full gap-1">
            <EditCourseLocationItem
                stepOrder={stepOrder}
                name={name}
                onDelete={onDelete}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
            />
            <EditCourseLocationMemo
                description={description}
                photos={photos}
                onChangeDescription={onChangeDescription}
                onAddPhoto={onAddPhoto}
                onRemovePhoto={onRemovePhoto}
            />
        </div>
    );
}