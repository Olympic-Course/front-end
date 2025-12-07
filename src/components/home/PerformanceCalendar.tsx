"use client";

import { getWeekDates } from "@/utils/getWeekDates";
import PerformanceCalendarItem from "./PerformanceCalendarItem";

interface PerformanceCalendarProps {
  eventDates: string[];
  selectedDate: string;
  onChangeDate: (date: string) => void;
}

export default function PerformanceCalendar({
  eventDates,
  selectedDate,
  onChangeDate
}: PerformanceCalendarProps) {

  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex justify-between w-full px-5 py-3">
      {weekDates.map((d) => (
        <PerformanceCalendarItem
          key={d.full}
          date={d.full}
          day={d.day}
          label={d.weekdayLabel}
          isActive={selectedDate === d.full}
          hasEvent={eventDates.includes(d.full)}
          onClick={onChangeDate}
        />
      ))}
    </div>
  );
}
