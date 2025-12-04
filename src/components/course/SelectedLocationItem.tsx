"use client"

import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SelectedLocationItemProps {
    locationIcon: string;
    name: string;
    latitude: number;
    longitude: number;
    onAddTempStep: (name: string) => void;
}

export default function SelectedLocationItem({
    locationIcon,
    name,
    onAddTempStep
}: SelectedLocationItemProps) {
    const [locationName, setLocationName] = useState(name);

    useEffect(() => {
        setLocationName(name);
    }, [name]);

    return (
        <div className="w-full flex py-3 px-4 justify-between gap-3 items-center border border-[#DBDBDB] rounded-xl">
            <Image
                src={locationIcon}
                alt={'편의시설 아이콘'}
                width={30}
                height={30}
            />
            <input
                className="w-full text-left text-sm font-semibold p-1 focus:outline-(--color-main)"
                value={locationName}
                placeholder='장소명을 입력하세요'
                onChange={(e) => setLocationName(e.target.value)}
            />
            <button
                onClick={() => onAddTempStep(locationName)}
            >
                <CirclePlus size={30} fill='#0088FF' color='#FFFFFF' />
            </button>
        </div>
    );
}