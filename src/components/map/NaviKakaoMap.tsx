/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Map, MapMarker, CustomOverlayMap, useKakaoLoader, Polyline } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { usePedestrianRoute } from "@/hooks/map/usePedestrianRoute";

interface PlacesData {
    RESTROOM: any[];
    TRASHCAN: any[];
    FOUNTAIN: any[];
    SMOKING_BOOTH: any[];
    VENDING_MACHINE: any[];
}

export default function NaviKakaoMap({
    places,
    isLoading,
    steps = [],
    showPins,
}: {
    places?: PlacesData;
    isLoading: boolean;
    steps?: {
        name: string;
        latitude: number;
        longitude: number;
        stepOrder?: number;
    }[];
    showPins: boolean;
}) {
    const [loading] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
        libraries: ["clusterer", "drawing", "services"],
    });

    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

    const { routePoints, fetchRoute, setRoutePoints } = usePedestrianRoute();

    const [currentPos, setCurrentPos] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        if (!steps || steps.length < 2) return;

        const loadRoutes = async () => {
            let all: { lat: number; lng: number }[] = [];

            for (let i = 0; i < steps.length - 1; i++) {
                const from = steps[i];
                const to = steps[i + 1];

                const pts = await fetchRoute(from, to);
                all = [...all, ...pts];
            }

            setRoutePoints(all);
        };

        loadRoutes();
    }, [steps]);

    useEffect(() => {
        if (typeof window === "undefined" || !navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCurrentPos({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => {
                console.error("GPS Error:", err);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);


    if (loading || isLoading) {
        return <div className="w-full h-full bg-gray-100" />;
    }

    const getRestroomLabel = (type: string) => {
        switch (type) {
            case "ALL":
                return "남/녀 화장실";
            case "FEMALE":
                return "여자 화장실";
            case "MALE":
                return "남자 화장실";
            default:
                return "";
        }
    };

    return (
        <div className="relative w-full h-full">
            <Map
                center={
                    currentPos ??
                    (steps[0]
                        ? { lat: steps[0].latitude, lng: steps[0].longitude }
                        : { lat: 37.520041, lng: 127.123153 } // steps도 없으면 기본값
                    )
                }
                level={3}
                className="w-full h-full"
                onClick={() => setSelectedPlace(null)} // 지도 클릭 시 InfoWindow 닫기
            >

                {/* ⭐ Tmap 보행자 Polyline */}
                {routePoints.length > 1 && (
                    <Polyline
                        path={routePoints}
                        strokeWeight={5}
                        strokeColor="#007AFF"
                        strokeOpacity={0.9}
                        strokeStyle="solid"
                    />
                )}

                {/* ⭐ 현재 위치 마커 */}
                {currentPos && (
                    <MapMarker
                        position={currentPos}
                        image={{
                            src: "/icons/current_pos_red.svg",
                            size: { width: 20, height: 20 },
                        }}
                    />
                )}

                {/* RESTROOM */}
                {showPins && places?.RESTROOM?.map((p) => (
                    <MapMarker
                        key={`restroom-${p.placeId}`}
                        position={{ lat: p.latitude, lng: p.longitude }}
                        image={{
                            src: "/icons/placeIcon/RESTROOM.svg",
                            size: { width: 32, height: 32 },
                        }}
                        onClick={() => setSelectedPlace(p)}
                    />
                ))}

                {/* TRASHCAN */}
                {showPins && places?.TRASHCAN?.map((p) => (
                    <MapMarker
                        key={`trash-${p.placeId}`}
                        position={{ lat: p.latitude, lng: p.longitude }}
                        image={{
                            src: "/icons/placeIcon/TRASHCAN.svg",
                            size: { width: 32, height: 32 },
                        }}
                        onClick={() => setSelectedPlace(p)}
                    />
                ))}

                {/* FOUNTAIN */}
                {showPins && places?.FOUNTAIN?.map((p) => (
                    <MapMarker
                        key={`fountain-${p.placeId}`}
                        position={{ lat: p.latitude, lng: p.longitude }}
                        image={{
                            src: "/icons/placeIcon/FOUNTAIN.svg",
                            size: { width: 32, height: 32 },
                        }}
                        onClick={() => setSelectedPlace(p)}
                    />
                ))}

                {/* SMOKING BOOTH */}
                {showPins && places?.SMOKING_BOOTH?.map((p) => (
                    <MapMarker
                        key={`smoking-${p.placeId}`}
                        position={{ lat: p.latitude, lng: p.longitude }}
                        image={{
                            src: "/icons/placeIcon/SMOKING_BOOTH.svg",
                            size: { width: 32, height: 32 },
                        }}
                        onClick={() => setSelectedPlace(p)}
                    />
                ))}

                {/* VENDING MACHINE */}
                {showPins && places?.VENDING_MACHINE?.map((p) => (
                    <MapMarker
                        key={`vm-${p.placeId}`}
                        position={{ lat: p.latitude, lng: p.longitude }}
                        image={{
                            src: "/icons/placeIcon/VENDING_MACHINE.svg",
                            size: { width: 32, height: 32 },
                        }}
                        onClick={() => setSelectedPlace(p)}
                    />
                ))}

                {/* ⭐ 선택된 마커에 대한 InfoWindow */}
                {selectedPlace && (
                    <CustomOverlayMap
                        position={{
                            lat: selectedPlace.latitude,
                            lng: selectedPlace.longitude,
                        }}
                    >
                        <div className="bg-white border border-gray-300 shadow-lg px-3 py-2 rounded-xl text-sm">
                            <div className="font-semibold mb-1">{selectedPlace.name}</div>

                            {/* RESTROOM일 때만 restroomType 표시 */}
                            {selectedPlace.category === "RESTROOM" && (
                                <div className="text-xs text-gray-600">
                                    {getRestroomLabel(selectedPlace.restroomType)}
                                </div>
                            )}
                        </div>
                    </CustomOverlayMap>
                )}

                {/* ⭐ Steps 마커 */}
                {steps.map((step, idx) => (
                    <CustomOverlayMap
                        key={`step-${idx}`}
                        position={{ lat: step.latitude, lng: step.longitude }}
                    >
                        <div className="w-6 h-6 rounded-full bg-(--color-main) text-white flex items-center justify-center text-xs font-semibold shadow">
                            {step.stepOrder ?? idx + 1}
                        </div>
                    </CustomOverlayMap>
                ))}

            </Map>
        </div>
    );
}
