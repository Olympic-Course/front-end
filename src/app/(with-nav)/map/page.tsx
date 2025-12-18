"use client";

import { useState } from "react";
import KakaoMap from "@/components/map/KakaoMap";
import MapFilter from "@/components/map/MapFilter";
import { usePlacesGet } from "@/hooks/map/usePlacesGet";
import type { Category } from "@/types/map";

export default function Page() {
  // 선택된 카테고리 (초기에는 모든 필터 활성화 등 원하는대로 설정)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    // "RESTROOM",
    // "TRASHCAN",
    // "FOUNTAIN",
    // "SMOKING_BOOTH",
    // "VENDING_MACHINE",
  ]);
  const [pinState, setPinState] = useState<"pinOn" | "pinOff">("pinOn");

  // API 호출
  const { data, isLoading } = usePlacesGet(selectedCategories);

  return (
    <div className="h-screen relative">
      <div className="w-full h-full">
        <KakaoMap
          places={data?.data}
          isLoading={isLoading}
          showPins={pinState === "pinOn"}
        />
      </div>

      <MapFilter
        selected={selectedCategories}
        onChange={setSelectedCategories}
        pinState={pinState}
        onPinToggle={() =>
          setPinState(prev => (prev === "pinOn" ? "pinOff" : "pinOn"))
        }
      />
    </div>
  );
}
