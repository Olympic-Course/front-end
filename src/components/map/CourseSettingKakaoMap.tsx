"use client";

import { Map, MapMarker, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";

type CategoryCode =
    | "MT1" | "CS2" | "PS3" | "SC4" | "AC5"
    | "PK6" | "OL7" | "SW8" | "BK9"
    | "AG2" | "PO3" | "AD5" | "FD6"
    | "CE7" | "HP8" | "PM9"
    | "AT4" | "CT1";

interface CourseSettinKakaoMapProps {
    onSelectLocation: (location: {
        name: string;
        latitude: number;
        longitude: number;
    }) => void;

    tempSteps?: {
        name: string;
        latitude: number;
        longitude: number;
    }[];
}

export default function CourseSettinKakaoMap({ onSelectLocation, tempSteps = [] }: CourseSettinKakaoMapProps) {
    const [loading] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
        libraries: ["clusterer", "drawing", "services"],
    });

    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    if (loading) return <div className="w-full h-52 bg-gray-100 rounded-lg" />;

    const handleClick = (
        _target: kakao.maps.Map,
        mouseEvent: kakao.maps.event.MouseEvent
    ) => {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();

        const places = new kakao.maps.services.Places();

        const categories: CategoryCode[] = [
            "AT4", "CT1", "HP8", "CE7", "FD6", "AD5", "PO3", "PK6", "SC4", "CS2"
        ];

        let foundPlaces: kakao.maps.services.PlacesSearchResultItem[] = [];

        const searchCategory = (idx: number) => {
            if (idx >= categories.length) {
                finalizeResult();
                return;
            }

            places.categorySearch(
                categories[idx],
                (result, status) => {
                    if (status === kakao.maps.services.Status.OK && result) {
                        foundPlaces = [...foundPlaces, ...result];
                    }
                    searchCategory(idx + 1);
                },
                {
                    location: new kakao.maps.LatLng(lat, lng),
                    radius: 50,
                }
            );
        };

        const finalizeResult = () => {
            if (foundPlaces.length > 0) {
                const sorted = [...foundPlaces].sort((a, b) => Number(a.distance) - Number(b.distance));
                const place = sorted[0];

                const placeLat = Number(place.y);
                const placeLng = Number(place.x);

                setMarkerPosition({ lat: placeLat, lng: placeLng });

                return onSelectLocation({
                    name: place.place_name,
                    latitude: placeLat,
                    longitude: placeLng,
                });
            }

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(lng, lat, (r, s) => {
                const name =
                    r?.[0]?.road_address?.building_name ||
                    r?.[0]?.address?.address_name ||
                    "이름 없음";

                setMarkerPosition({ lat, lng });

                return onSelectLocation({
                    name,
                    latitude: lat,
                    longitude: lng,
                });
            });
        };

        searchCategory(0);
    };

    return (
        <Map
            center={{ lat: 37.520041, lng: 127.123153 }}
            level={5}
            className="w-full h-full"
            onClick={handleClick}
        >
            {/* 클릭 시 찍히는 마커 */}
            {markerPosition && (
                <MapMarker position={markerPosition} />
            )}

            {/* tempSteps 마커 */}
            {tempSteps.map((step, idx) => (
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
