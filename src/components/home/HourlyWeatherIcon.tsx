"use client";

import Image from "next/image";
import { PtyType, SkyType, getWeatherIcon } from "@/constants/weather";

interface HourlyWeatherData {
    time: string;
    temp: number;
    sky: SkyType;
    pty: PtyType;
}

interface HourlyWeatherIconProps {
    hourly: HourlyWeatherData;
}

export default function HourlyWeatherIcon({ hourly }: HourlyWeatherIconProps) {
    const { time, temp, pty, sky } = hourly;

    const [hourRaw] = time.split(":");
    const hour = Number(hourRaw);

    // 낮/밤 판별
    const isDay = hour >= 6 && hour < 18;

    // label 만들기
    let timeLabel = `${hour}시`;
    if (hour === 0) {
        timeLabel = "내일";
    }

    const { icon } = getWeatherIcon(pty, sky, isDay);

    return (
        <div className="flex flex-col items-center">
            {/* 온도 */}
            <span className="text-[12px] font-semibold mb-1">{temp}°</span>

            {/* 아이콘 */}
            <div className="relative w-8 h-8 p-2">
                <Image src={icon} alt="weather-icon" fill sizes="24px" />
            </div>

            {/* 시간 라벨 */}
            <span className="text-[11px] font-semibold">{timeLabel}</span>
        </div>
    );
}