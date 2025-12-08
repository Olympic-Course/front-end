export type Category =
  | "TRASHCAN"
  | "FOUNTAIN"
  | "SMOKING_BOOTH"
  | "VENDING_MACHINE"
  | "RESTROOM";

export interface PlaceBase {
  placeId: number;
  name: string;
  latitude: number;
  longitude: number;
  category: Category;
}

export interface PlaceRestroom extends PlaceBase {
  restroomType: "ALL" | "MALE" | "FEMALE";
}

export type PlaceCommon = PlaceBase;

export interface PlacesResponse {
  success: boolean;
  code: string;
  data: {
    RESTROOM: PlaceRestroom[];
    TRASHCAN: PlaceCommon[];
    FOUNTAIN: PlaceCommon[];
    SMOKING_BOOTH: PlaceCommon[];
    VENDING_MACHINE: PlaceCommon[];
  };
}
