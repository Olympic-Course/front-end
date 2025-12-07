"use client";

interface PerformanceListProps {
  events: { name: string; place: string }[];
}

export default function PerformanceList({ events }: PerformanceListProps) {
  if (events.length === 0) {
    return (
      <div className="w-full flex justify-center text-sm text-gray-500 py-4">
        해당 날짜에는 공연 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100 mt-3">
      {events.map((e, idx) => (
        <div key={idx} className="w-full flex justify-between items-center py-4 gap-5">
          <span className="text-[12px] font-semibold">{e.name}</span>
          <span className="text-[12px] font-medium text-gray-500">{e.place}</span>
        </div>
      ))}
    </div>
  );
}
