export const AVATAR_ANIMATION_IDS = [
  "animation-blink",
  "animation-wink-left",
  "animation-wink-right",
  "animation-breathe",
  "animation-float",
  "animation-sway",
] as const;

export type AvatarAnimationId = (typeof AVATAR_ANIMATION_IDS)[number];

export type AvatarAnimationChannel = "eyes" | "movement";

export type AvatarEyeSequence = "blink" | "wink-left" | "wink-right";

interface AvatarAnimationBase {
  id: AvatarAnimationId;
  label: string;
  description: string;
  icon: string;
}

export interface AvatarEyeAnimationDefinition extends AvatarAnimationBase {
  channel: "eyes";
  eyeSequence: AvatarEyeSequence;
}

export interface AvatarMovementAnimationDefinition extends AvatarAnimationBase {
  channel: "movement";
  movementClassName: string;
}

export type AvatarAnimationDefinition =
  | AvatarEyeAnimationDefinition
  | AvatarMovementAnimationDefinition;
