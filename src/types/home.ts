// src/types/home.ts

// 시간별 날씨
export interface HourlyWeather {
  time: string;
  temp: number;
  sky: string;   // CLEAR, CLOUDY …
  pty: string;   // NONE, RAIN, SNOW …
}

// 현재 날씨
export interface Weather {
  humidity: number;
  temp: number;
  feelsLike: number;
  findDust: string;       // GOOD, NORMAL …
  ultrafineDust: string;  // GOOD, NORMAL …
  uv: string;
  sky: string;
  pty: string;
  hourly: HourlyWeather[];
}

// 개별 이벤트 정보
export interface EventInfo {
  name: string;
  place: string;
}

// 특정 날짜의 이벤트 상세
export interface DetailEvent {
  date: string;
  eventInfo: EventInfo[];
}

// 전체 이벤트 정보
export interface EventData {
  eventDates: string[];
  detailEvent: DetailEvent;
}

// 인기 코스
export interface BestCourse {
  courseId: number;
  thumbnail: string;
  title: string;
  likeNum: number;
  liked: boolean;
  writer: string;
}

// 최종 홈 API Response
export interface GetHomeResponse {
  success: boolean;
  code: string;
  data: {
    weather: Weather;
    event: EventData;
    bestCourses: BestCourse[];
  };
}
