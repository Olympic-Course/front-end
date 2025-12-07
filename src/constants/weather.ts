// src/constants/weather.ts

// -------------------------
// 타입 정의
// -------------------------
export type PtyType = "NONE" | "RAIN" | "RAIN_SNOW" | "SNOW";
export type SkyType = "CLEAR" | "CLOUDY" | "FOG";

// 아이콘 정보 구조
export interface WeatherIconInfo {
  label: string;
  icon: string; // 실제 사용 시 public 경로 기반
}

// -------------------------
// 날씨 아이콘 매핑 (PTY 우선)
// -------------------------
export const PTY_ICON_MAP: Record<PtyType, WeatherIconInfo | null> = {
  NONE: null, // NONE이면 sky로 분기
  RAIN: {
    label: "비",
    icon: "/icons/weatherIcon/RAIN.svg",
  },
  RAIN_SNOW: {
    label: "비와눈",
    icon: "/icons/weatherIcon/RAIN_SNOW.svg",
  },
  SNOW: {
    label: "눈",
    icon: "/icons/weatherIcon/SNOW.svg",
  },
};

// -------------------------
// SKY 아이콘 매핑 (PTY === NONE 일 때만 처리)
// CLEAR & CLOUDY는 낮/밤 구분
// -------------------------
export const SKY_ICON_MAP = {
  CLEAR: {
    label: "맑음",
    day: "/icons/weatherIcon/CLEAR_day.svg",
    night: "/icons/weatherIcon/CLEAR_night.svg",
  },
  CLOUDY: {
    label: "구름낌",
    day: "/icons/weatherIcon/CLOUDY_day.svg",
    night: "/icons/weatherIcon/CLOUDY_night.svg",
  },
  FOG: {
    label: "흐림",
    icon: "/icons/weatherIcon/FOG.svg",
  },
} as const;

// -------------------------
// helper 함수 (선택사항)
// (sky/pty + isDay 로 실제 아이콘 반환)
// -------------------------
export function getWeatherIcon(
  pty: PtyType,
  sky: SkyType,
  isDay: boolean
): WeatherIconInfo {
  // 1) PTY 우선 처리
  const ptyIcon = PTY_ICON_MAP[pty];
  if (ptyIcon) return ptyIcon;

  // 2) PTY가 NONE → SKY 처리
  if (sky === "FOG") {
    return {
      label: SKY_ICON_MAP.FOG.label,
      icon: SKY_ICON_MAP.FOG.icon,
    };
  }

  // CLEAR / CLOUDY는 낮/밤 구분
  const skyData = SKY_ICON_MAP[sky];
  return {
    label: skyData.label,
    icon: isDay ? skyData.day : skyData.night,
  };
}


// src/constants/weather.ts

export const FINE_DUST_STATUS_MAP = {
  GOOD: {
    label: "좋음",
    bg: "#D2EAFF",
    color: "#0088FF",
  },
  NORMAL: {
    label: "보통",
    bg: "#D2FFD8",
    color: "#34C759",
  },
  BAD: {
    label: "나쁨",
    bg: "#FFF1D2",
    color: "#FFA100",
  },
  VERY_BAD: {
    label: "매우 나쁨",
    bg: "#FFD2D2",
    color: "#FF0000",
  },
} as const;

export const UV_STATUS_MAP = {
  LOW: {
    label: "낮음",
    bg: "#D2EAFF",
    color: "#0088FF",
  },
  NORMAL: {
    label: "보통",
    bg: "#D2FFD8",
    color: "#34C759",
  },
  HIGH: {
    label: "높음",
    bg: "#FFF1D2",
    color: "#FFA100",
  },
  VERY_HIGH: {
    label: "매우 높음",
    bg: "#FFD2D2",
    color: "#FF0000",
  },
  VERY_DANGEROUS: {
    label: "매우 위험",
    bg: "#FF8787",
    color: "#BD0000",
  },
} as const;
