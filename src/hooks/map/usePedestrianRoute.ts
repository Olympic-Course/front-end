/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

// ⭐ EPSG3857 → WGS84 변환 함수 (Tmap SDK 없이 동작)
function convertEPSG3857ToWGS84(x: number, y: number) {
  const lng = (x / 20037508.34) * 180;
  const lat = (y / 20037508.34) * 180;

  const latRad =
    (180 / Math.PI) *
    (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);

  return { lat: latRad, lng };
}

export function usePedestrianRoute() {
  const [routePoints, setRoutePoints] = useState<{ lat: number; lng: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoute = async (from: any, to: any) => {
    setLoading(true);

    try {
      const params = {
        startX: from.longitude,
        startY: from.latitude,
        endX: to.longitude,
        endY: to.latitude,
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857",
        startName: "출발지",
        endName: "도착지",
      };

      // ⭐ form-urlencoded 변환
      const formBody = Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&");

      const res = await fetch(
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY!,
          },
          body: formBody,
        }
      );

      const data = await res.json();

      if (!data.features) throw new Error("Invalid response");

      const lineCoords: { lat: number; lng: number }[] = [];

      // ⭐ EPSG3857 → WGS84 변환
      data.features
        .filter((f: any) => f.geometry.type === "LineString")
        .forEach((f: any) => {
          f.geometry.coordinates.forEach(([x, y]: number[]) => {
            const point = convertEPSG3857ToWGS84(x, y);
            lineCoords.push(point);
          });
        });

      setRoutePoints(lineCoords);
      setLoading(false);

      return lineCoords;
    } catch (err) {
      console.error("Tmap API Error:", err);
      setLoading(false);
      throw err;
    }
  };

  return { routePoints, loading, fetchRoute, setRoutePoints };
}
