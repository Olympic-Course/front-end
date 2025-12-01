import { CirclePlus } from 'lucide-react';
import Image from 'next/image';

interface SelectedLocationItemProps {
    locationIcon: string;
    name: string;
    onClick?: () => void;
}

export default function SelectedLocationItem({ locationIcon, name, onClick }: SelectedLocationItemProps) {
    return (
        <div className="w-full flex py-3 px-4 justify-between gap-3 items-center border border-[#DBDBDB] rounded-xl">
            <Image
                src={locationIcon}
                alt={'편의시설 아이콘'}
                width={30}
                height={30}
            />
            <span className="w-full text-left text-sm font-semibold">{name}</span>
            <button
                onClick={onClick}
            >
                <CirclePlus size={30} fill='#0088FF' color='#FFFFFF' />
            </button>
        </div>
    );
}