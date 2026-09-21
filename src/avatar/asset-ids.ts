export const FACE_SHAPE_IDS = [
  "face-rounded",
  "face-round",
  "face-oval",
  "face-wide",
  "face-narrow",
  "face-soft-square",
] as const;
export const HAIR_STYLE_IDS = ["hair-none"] as const;
export const GLASSES_IDS = ["glasses-none"] as const;
export const FACIAL_HAIR_IDS = ["facial-hair-none"] as const;
export const HEADWEAR_IDS = ["headwear-none"] as const;
export const EARS_IDS = ["ears-none"] as const;
export const ACCESSORY_IDS = ["accessory-none"] as const;

type ArrayValue<T extends readonly string[]> = T[number];

export type FaceShapeId = ArrayValue<typeof FACE_SHAPE_IDS>;
export type HairStyleId = ArrayValue<typeof HAIR_STYLE_IDS> | `hair-${string}`;
export type GlassesId = ArrayValue<typeof GLASSES_IDS> | `glasses-${string}`;
export type FacialHairId =
  | ArrayValue<typeof FACIAL_HAIR_IDS>
  | `beard-${string}`
  | `moustache-${string}`;
export type HeadwearId = ArrayValue<typeof HEADWEAR_IDS> | `headwear-${string}`;
export type EarsId = ArrayValue<typeof EARS_IDS> | `ears-${string}`;
export type AccessoryId = ArrayValue<typeof ACCESSORY_IDS> | string;
