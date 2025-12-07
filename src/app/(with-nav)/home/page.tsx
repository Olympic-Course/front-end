"use client";

import MenuSection from "@/components/common/MenuSection";
import BestCoursesSection from "@/components/course/BestCoursesSection";
import CurrentWeatherCard from "@/components/home/CurrentWeatherCard";
import HourlyWeatherIcon from "@/components/home/HourlyWeatherIcon";
import PerformanceCalendar from "@/components/home/PerformanceCalendar";
import PerformanceList from "@/components/home/PerformanceList";
import WeatherDetailItem from "@/components/home/WeatherDetailItem";
import { PtyType, SkyType } from "@/constants/weather";
import { useEventListGet } from "@/hooks/home/useEventListGet";
import { useHomeGet } from "@/hooks/home/useHomeGet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const { data, isLoading, error } = useHomeGet();

    const [selectedDate, setSelectedDate] = useState<string>("");
    const {
        data: eventListResponse,
        isLoading: eventLoading,
    } = useEventListGet(selectedDate);

    // selectedDate 초기화
    useEffect(() => {
        if (!selectedDate && data) {
            setSelectedDate(data.data.event.detailEvent.date);
        }
    }, [data, selectedDate]);

    // 🔥 이제 렌더링 조건 분기를 아래에서 처리
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-400"></div>
                <span className="mt-3 text-gray-400">불러오는 중...</span>
            </div>
        );
    }
    
    if (error) return <div>에러 발생...</div>;

    const { weather, event, bestCourses } = data!.data;
    const currentEventData = eventListResponse?.data ?? event;

    return (
        <div className="flex flex-col px-5 pt-3 pb-7 justify-start items-center gap-5">
            {/* 날씨 영역 */}
            <MenuSection title={"지금 올림픽 공원은"} >
                <div className="w-full flex flex-col items-center gap-3">
                    {/* 현재 날씨 카드 */}
                    <CurrentWeatherCard
                        temp={weather.temp}
                        feelsLike={weather.feelsLike}
                        pty={weather.pty as PtyType}
                        sky={weather.sky as SkyType}
                    />

                    {/* 미세먼지, 초미세먼지, 자외선, 습도 카드 */}
                    <div className="w-full flex justify-between gap-2">
                        <WeatherDetailItem
                            title="미세먼지"
                            type="find"
                            value={weather.findDust}
                        />
                        <WeatherDetailItem
                            title="초미세먼지"
                            type="ultraFine"
                            value={weather.ultrafineDust}
                        />
                        <WeatherDetailItem
                            title="자외선"
                            type="uv"
                            value={weather.uv}
                        />
                        <WeatherDetailItem
                            title="습도"
                            type="humidity"
                            value={weather.humidity + "%"}
                        />
                    </div>
                    <div className="w-full flex justify-center gap-7">
                        {weather.hourly.map((hourly, idx) => (
                            <HourlyWeatherIcon
                                key={idx}
                                hourly={{
                                    ...hourly,
                                    sky: hourly.sky as SkyType,
                                    pty: hourly.pty as PtyType,
                                }}
                            />
                        ))}
                    </div>
                </div>

            </MenuSection>

            {/* 공연 영역 */}
            <MenuSection title={"이번 주 공연"} >
                <PerformanceCalendar
                    eventDates={event.eventDates}
                    selectedDate={selectedDate}
                    onChangeDate={(date) => setSelectedDate(date)}
                />
                <PerformanceList events={currentEventData.detailEvent.eventInfo} />
            </MenuSection>

            {/* 이달의 베스트3 코스 영역 */}
            <MenuSection title={"이달의 베스트3 코스"} >
                <BestCoursesSection bestCourses={bestCourses} />
                <button
                    className="flex justify-end w-full"
                    onClick={() => router.push("/courses")}
                >
                    <span className=" text-[11px] text-[#9C9C9C] font-medium">추천 코스 더보기 &gt;</span>
                </button>
            </MenuSection>
        </div>
    );
}