"use client";

import { FINE_DUST_STATUS_MAP, UV_STATUS_MAP } from "@/constants/weather";

interface WeatherDetailItemProps {
    title: string;
    value: string;  // GOOD, NORMAL, BAD, ...
    type: "find" | "ultraFine" | "uv" | "humidity";
}

export default function WeatherDetailItem({ title, value, type }: WeatherDetailItemProps) {
    let colorInfo;

    if (type === "find" || type === "ultraFine") {
        colorInfo = FINE_DUST_STATUS_MAP[value as keyof typeof FINE_DUST_STATUS_MAP];
    } else if (type === "uv") {
        colorInfo = UV_STATUS_MAP[value as keyof typeof UV_STATUS_MAP];
    }

    // 습도는 색상 없이 기본 박스
    const bg = colorInfo?.bg || "#ffffff";
    const textColor = colorInfo?.color || "#000000";

    const isHumidity = type === "humidity";

    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-2 w-24
        ${isHumidity ? "border-2 border-[#D2EAFF]" : ""}
      `}
            style={{ backgroundColor: bg }}
        >
            <span className="text-[11px] font-semibold">{title}</span>
            <span className="text-[14px] font-semibold" style={{ color: textColor }}>
                {colorInfo?.label || value}
            </span>
        </div>
    );
}
