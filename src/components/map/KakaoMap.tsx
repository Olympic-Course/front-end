"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });

  console.log("Loading:", loading, "Error:", error);
  console.log("Key:", process.env.NEXT_PUBLIC_KAKAO_API_KEY);

  if (loading) {
    return <div className="w-full h-52 bg-gray-100 rounded-lg" />;
  }

  return (
    <Map
      center={{ lat: 37.520041, lng: 127.123153 }}
      level={5}
      className="w-full h-full relative"
    />
  );
}
