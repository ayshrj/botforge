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

export { AVATAR_ANIMATION_IDS } from "./animation/types";

export type {
  AvatarAnimationChannel,
  AvatarAnimationDefinition,
  AvatarAnimationId,
  AvatarEyeAnimationDefinition,
  AvatarEyeSequence,
  AvatarMovementAnimationDefinition,
} from "./animation/types";

export {
  AVATAR_ANIMATIONS,
  AVATAR_ANIMATION_REGISTRY,
  EYE_ANIMATIONS,
  MOVEMENT_ANIMATIONS,
  canonicalizeAnimations,
  getAvatarAnimation,
  getSelectedEyeAnimation,
  getSelectedMovementAnimations,
  toggleAvatarAnimation,
} from "./animation/registry";

export { EMPTY_AVATAR_ASSET_REGISTRY } from "./asset-registry";

export type {
  AvatarAssetComponent,
  AvatarAssetDefinition,
  AvatarAssetProps,
  AvatarAssetRegistry,
} from "./asset-registry";

export { AVATAR_DESIGN } from "./design-system";

export type { AvatarBounds, AvatarPoint } from "./design-system";

export { DEFAULT_AVATAR_CONFIG, HEAD_POSES } from "./types";

export type { AvatarConfig, HeadPose } from "./types";

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
