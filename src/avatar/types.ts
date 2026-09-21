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
  faceShape: "face-rounded",
  skinColor: "#F2B38F",

  hairStyle: "hair-none",
  hairColor: "#302A28",

  glasses: "glasses-none",
  facialHair: "facial-hair-none",
  headwear: "headwear-none",
  ears: "ears-none",
  accessory: "accessory-none",

  blushColor: "#E78F88",
};
