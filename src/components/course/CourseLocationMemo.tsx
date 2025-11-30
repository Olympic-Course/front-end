import LocationPhoto from "./LocationPhoto";

interface CourseLocationMemoProps {
    locationMemo: string;
}


export default function CourseLocationMemo({ locationMemo }: CourseLocationMemoProps) {
    return (
        <div className="flex flex-col w-full p-3 gap-2 bg-[#F7F7F7] rounded-xl justify-start">
            <span className="text-sm font-semibold text-gray-700 whitespace-pre-line leading-relaxed">
                {locationMemo}
            </span>
            <div className="flex gap-1.5">
                <LocationPhoto />
                <LocationPhoto />
                <LocationPhoto />
            </div>
        </div>
    );
}