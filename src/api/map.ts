// src/api/map.ts
import api from "@/libs/AxiosInstance";
import type { PlacesResponse, Category } from "@/types/map";

export async function getPlaces(categories: Category[]) {
  const params = new URLSearchParams();

  // filter=RESTROOM&filter=TRASHCAN
  categories.forEach((c) => params.append("filter", c));

  const res = await api.get<PlacesResponse>(`/api/map/places?${params.toString()}`);
  return res.data;
}