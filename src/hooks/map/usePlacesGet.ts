// src/hooks/map/usePlacesGet.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/api/map";
import type { Category } from "@/types/map";

export function usePlacesGet(categories: Category[]) {
  return useQuery({
    queryKey: ["places", categories],
    queryFn: () => getPlaces(categories),
    enabled: categories.length > 0,
  });
}
