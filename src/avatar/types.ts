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
