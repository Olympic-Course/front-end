export function getWeekDates(selectedDate?: string) {
  const now = selectedDate ? new Date(selectedDate) : new Date();

  // 한국 시간 기준
  const koreaNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  // 이번 주 월요일 찾기
  const day = koreaNow.getUTCDay(); // 일(0)~토(6)
  const diff = day === 0 ? -6 : 1 - day; // 월요일 기준

  const monday = new Date(koreaNow);
  monday.setUTCDate(koreaNow.getUTCDate() + diff);

  // 7일간 날짜 생성
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);

    dates.push({
      full: d.toISOString().slice(0, 10), // yyyy-mm-dd
      day: d.getUTCDate(), // 1~31
      weekdayLabel: ["월", "화", "수", "목", "금", "토", "일"][i],
    });
  }

  return dates;
}
