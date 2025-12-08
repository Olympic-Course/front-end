/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Map, MapMarker, CustomOverlayMap, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState } from "react";

interface PlacesData {
  RESTROOM: any[];
  TRASHCAN: any[];
  FOUNTAIN: any[];
  SMOKING_BOOTH: any[];
  VENDING_MACHINE: any[];
}

export default function KakaoMap({
  places,
  isLoading,
}: {
  places?: PlacesData;
  isLoading: boolean;
}) {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });

  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

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
        center={{ lat: 37.520041, lng: 127.123153 }}
        level={5}
        className="w-full h-full"
        onClick={() => setSelectedPlace(null)} // 지도 클릭 시 InfoWindow 닫기
      >
        {/* RESTROOM */}
        {places?.RESTROOM?.map((p) => (
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
        {places?.TRASHCAN?.map((p) => (
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
        {places?.FOUNTAIN?.map((p) => (
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
        {places?.SMOKING_BOOTH?.map((p) => (
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
        {places?.VENDING_MACHINE?.map((p) => (
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

      </Map>
    </div>
  );
}
