// src/constants/filter.ts
import type { Category } from "@/types/map";

export const FILTER_LIST: { label: string; key: Category }[] = [
  { label: "쓰레기통", key: "TRASHCAN" },
  { label: "음수대", key: "FOUNTAIN" },
  { label: "흡연 부스", key: "SMOKING_BOOTH" },
  { label: "자판기", key: "VENDING_MACHINE" },
  { label: "화장실", key: "RESTROOM" },
];
