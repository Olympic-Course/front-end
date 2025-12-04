"use client";

import { Map, MapMarker, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";

interface CreateKakaoMapMapProps {
    Steps?: {
        name: string;
        latitude: number;
        longitude: number;
    }[];
}

export default function CreateKakaoMap({ Steps = [] }: CreateKakaoMapMapProps) {
    const [loading] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
        libraries: ["clusterer", "drawing", "services"],
    });

    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    const [selectedPlace, setSelectedPlace] = useState<string>("");

    const handleMapClick = (_target: any, mouseEvent: any) => {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(lng, lat, (result: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                const buildingName =
                    result[0]?.road_address?.building_name ??
                    result[0]?.address?.address_name ??
                    "이름 없음";

                console.log("선택된 장소:", buildingName);
                setSelectedPlace(buildingName);
            }
        });
    };

    if (loading) {
        return <div className="w-full h-52 bg-gray-100 rounded-lg" />;
    }

    return (
        <Map
            center={{ lat: 37.520041, lng: 127.123153 }}
            level={5}
            className="w-full h-full"
            onClick={handleMapClick}
        >

            {/* Steps 마커 */}
            {Steps.map((step, idx) => (
                <CustomOverlayMap
                    key={idx}
                    position={{ lat: step.latitude, lng: step.longitude }}
                >
                    <div className="w-6 h-6 rounded-full bg-(--color-main) text-white flex items-center justify-center text-xs font-semibold shadow">
                        {idx + 1}
                    </div>
                </CustomOverlayMap>
            ))}
        </Map>
    );
}
