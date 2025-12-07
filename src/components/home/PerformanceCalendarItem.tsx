"use client";

interface PerformanceCalendarItemProps {
  date: string;          // yyyy-mm-dd
  day: number;           // 1~31
  label: string;         // 월~일
  isActive: boolean;     
  hasEvent: boolean;     
  onClick: (date: string) => void;
}

export default function PerformanceCalendarItem({
  date, day, label, isActive, hasEvent, onClick
}: PerformanceCalendarItemProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={() => onClick(date)}>
      <span className="text-xs text-[#757575] font-medium">{label}</span>

      <div
        className={`w-10 h-10 flex items-center font-semibold justify-center rounded-xl mt-1
          ${isActive ? "bg-(--color-main) text-white" : "text-black"}
        `}
      >
        {day}
      </div>

      {/* 노란 점 */}
      {hasEvent && (
        <div className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-1" />
      )}
    </div>
  );
}
