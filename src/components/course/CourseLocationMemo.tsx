import LocationPhoto from "./LocationPhoto";

interface CourseLocationMemoProps {
    type: "create" | "detail";
    locationMemo?: string;
    photos?: string[];
    thumbnail: string | null;                 // store에서 온 현재 대표 사진 URL
    onSelectThumbnail: (photoUrl: string) => void;
}


export default function CourseLocationMemo({
    type,
    locationMemo,
    photos = [],
    thumbnail,
    onSelectThumbnail
}: CourseLocationMemoProps) {
    return (
        <div className="flex flex-col w-full p-3 gap-2 bg-[#F7F7F7] rounded-xl justify-start">
            {locationMemo && (
                <span className="text-sm font-semibold text-gray-700 whitespace-pre-line leading-relaxed">
                    {locationMemo}
                </span>
            )}
            {photos.length > 0 && (
                <div className="flex gap-1.5 overflow-x-auto">
                    {photos.map((photoUrl, idx) => (
                        <LocationPhoto
                            type={type}
                            key={idx}
                            photoUrl={photoUrl}
                            thumbnailActive={thumbnail === photoUrl}
                            onClickThumbnail={() => onSelectThumbnail(photoUrl)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}