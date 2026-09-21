export {
  ACCESSORY_ASSET_IDS,
  EAR_ASSET_IDS,
  FACE_SHAPE_IDS,
  GLASSES_IDS,
  HAIR_STYLE_IDS,
  HEADWEAR_IDS,
} from "./asset-ids";

export type {
  AccessoryAssetId,
  AccessorySelectionId,
  EarAssetId,
  FaceShapeId,
  FacialHairId,
  FacialHairSelectionId,
  GlassesId,
  GlassesSelectionId,
  HairStyleId,
  HairStyleSelectionId,
  HeadwearId,
  HeadwearSelectionId,
} from "./asset-ids";

export { EMPTY_AVATAR_ASSET_REGISTRY } from "./asset-registry";

export type {
  AvatarAssetComponent,
  AvatarAssetDefinition,
  AvatarAssetProps,
  AvatarAssetRegistry,
} from "./asset-registry";

export { AVATAR_DESIGN } from "./design-system";

export type { AvatarBounds, AvatarPoint } from "./design-system";

export { DEFAULT_AVATAR_CONFIG } from "./types";

export type { AvatarConfig } from "./types";

export {
  AVATAR_HEAD_LAYER_ORDER,
  AVATAR_LAYER_ORDER,
  AvatarLayer,
} from "./components/avatar-layer";

export type {
  AvatarHeadLayerId,
  AvatarLayerId,
  AvatarLayerProps,
} from "./components/avatar-layer";

export { BotAvatar } from "./bot-avatar";

export type { BotAvatarProps } from "./bot-avatar";
