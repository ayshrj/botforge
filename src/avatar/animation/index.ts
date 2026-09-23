export { AVATAR_ANIMATION_IDS } from "./types";

export type {
  AvatarAnimationChannel,
  AvatarAnimationDefinition,
  AvatarAnimationId,
  AvatarEyeAnimationDefinition,
  AvatarEyeSequence,
  AvatarMovementAnimationDefinition,
} from "./types";

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
} from "./registry";
