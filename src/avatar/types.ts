import type {
  AccessoryId,
  EarsId,
  FaceShapeId,
  FacialHairId,
  GlassesId,
  HairStyleId,
  HeadwearId,
} from "./asset-ids";

export interface AvatarConfig {
  faceShape: FaceShapeId;
  skinColor: string;

  hairStyle: HairStyleId;
  hairColor: string;

  glasses: GlassesId;
  facialHair: FacialHairId;
  headwear: HeadwearId;
  ears: EarsId;
  accessory: AccessoryId;

  blushColor: string;
}

export const DEFAULT_AVATAR_CONFIG: Readonly<AvatarConfig> = {
  faceShape: "face-round",
  skinColor: "#D99B73",

  hairStyle: "hair-short-basic",
  hairColor: "#29292E",

  glasses: "glasses-none",
  facialHair: "facial-hair-none",
  headwear: "headwear-none",
  ears: "ears-standard",
  accessory: "accessory-none",

  blushColor: "#D98787",
};
