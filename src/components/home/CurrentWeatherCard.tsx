"use client";

import Image from "next/image";
import { PtyType, SkyType, getWeatherIcon } from "@/constants/weather";

interface CurrentWeatherCardProps {
  temp: number;
  feelsLike: number;
  pty: PtyType;
  sky: SkyType;
}

export default function CurrentWeatherCard({
  temp,
  feelsLike,
  pty,
  sky,
}: CurrentWeatherCardProps) {
  // 현재 시간 기준 낮/밤 판별
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  // 날씨 아이콘 + label 가져오기
  const weatherInfo = getWeatherIcon(pty, sky, isDay);

  // 배경 gradient (낮/밤 버전)
  const bgGradient = isDay
    ? "bg-gradient-to-r from-[#A8C8FF] to-[#799BD3]" // 낮 그라데이션 (수정 가능)
    : "bg-gradient-to-r from-[#8DA3BA] to-[#394B54]"; // 밤 그라데이션 (수정 가능)

  return (
    <div
      className={`w-full h-[100px] rounded-2xl text-white flex justify-between items-center px-10 ${bgGradient}`}
    >
      {/* Left: 날씨 아이콘 */}
      <div className="flex items-center">
        <div className="relative w-12 h-12">
          <Image
            src={weatherInfo.icon}
            alt={weatherInfo.label}
            fill
            sizes="48px"
          />
        </div>
      </div>

      {/* Center: 온도 */}
      <div className="text-[30px] font-semibold">
        {temp}°
      </div>

      {/* Right: 체감온도 / 날씨설명 */}
      <div className="flex flex-col text-right">
        <span className="text-sm font-medium">체감 온도 {feelsLike}°</span>
        <span className="text-sm font-medium mt-1">{weatherInfo.label}</span>
      </div>
    </div>
  );
}
