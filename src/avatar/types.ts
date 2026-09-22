import type {
  AccessorySelectionId,
  EarAssetId,
  FaceShapeId,
  FacialHairSelectionId,
  GlassesSelectionId,
  HairStyleSelectionId,
  HeadwearSelectionId,
} from "./asset-ids";

export interface AvatarConfig {
  headPose: HeadPose;
  background: string;
  glassesColor: string;
  facialHairColor: string;
  headwearColor: string;
  accessoryColor: string;
  faceShape: FaceShapeId;
  skinColor: string;

  hairStyle: HairStyleSelectionId;
  hairColor: string;

  glasses: GlassesSelectionId;
  facialHair: FacialHairSelectionId;
  headwear: HeadwearSelectionId;
  ears: EarAssetId;
  accessory: AccessorySelectionId;

  blushColor: string;
}

export const DEFAULT_AVATAR_CONFIG: Readonly<AvatarConfig> = {
  headPose: "tilt-right-soft",
  background: "#E9DFF5",
  glassesColor: "#393044",
  facialHairColor: "#493126",
  headwearColor: "#7961A8",
  accessoryColor: "#D9A54D",
  faceShape: "face-round",
  skinColor: "#D99B73",

  hairStyle: "hair-short-basic",
  hairColor: "#493126",

  glasses: "glasses-none",
  facialHair: "facial-hair-none",
  headwear: "headwear-none",
  ears: "ears-standard",
  accessory: "accessory-none",

  blushColor: "#D98787",
};

export const HEAD_POSES = ["upright", "tilt-left-soft", "tilt-right-soft", "tilt-left-strong", "tilt-right-strong"] as const;
export type HeadPose = (typeof HEAD_POSES)[number];
