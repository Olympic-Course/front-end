/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState } from "react";

export default function KakaoMap() {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });

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
    <div className="relative w-full h-full">
      <Map
        center={{ lat: 37.520041, lng: 127.123153 }}
        level={5}
        className="w-full h-full"
        onClick={handleMapClick}
      />

      {/* 선택된 장소 이름 표시 */}
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-xl shadow text-sm">
          {selectedPlace}
        </div>
      )}
    </div>
  );
}
