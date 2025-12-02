import KakaoMap from "@/components/map/KakaoMap";
import MapFilter from "@/components/map/MapFilter";

export default function Page() {

  return (
    <div className="h-screen relative">
      <div className="w-full h-full">
        <KakaoMap />
      </div>
      <MapFilter />
    </div>
  )
}
