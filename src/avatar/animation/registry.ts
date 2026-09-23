import { MoveVertical, MoveUp, MoveHorizontal } from "lucide-react";
import {
  AVATAR_ANIMATION_IDS,
  type AvatarAnimationDefinition,
  type AvatarAnimationId,
  type AvatarEyeAnimationDefinition,
  type AvatarMovementAnimationDefinition,
} from "./types";

export const AVATAR_ANIMATIONS: readonly AvatarAnimationDefinition[] = [
  {
    id: "animation-blink",
    label: "Blink",
    description: "Occasionally blink both capsule eyes.",
    icon: "◡",
    channel: "eyes",
    eyeSequence: "blink",
  },
  {
    id: "animation-wink-left",
    label: "Wink left",
    description: "Occasionally close the left eye.",
    icon: "◔",
    channel: "eyes",
    eyeSequence: "wink-left",
  },
  {
    id: "animation-wink-right",
    label: "Wink right",
    description: "Occasionally close the right eye.",
    icon: "◕",
    channel: "eyes",
    eyeSequence: "wink-right",
  },
  {
    id: "animation-breathe",
    label: "Breathe",
    description: "Add a subtle relaxed breathing motion.",
    icon: "↕",
    channel: "movement",
    iconLucide: MoveVertical,
    movementClassName: "avatar-motion-breathe",
  },
  {
    id: "animation-float",
    label: "Float",
    description: "Slowly hover up and down.",
    icon: "↑",
    iconLucide: MoveUp,
    channel: "movement",
    movementClassName: "avatar-motion-float",
  },
  {
    id: "animation-sway",
    label: "Sway",
    description: "Gently rock from side to side.",
    icon: "↔",
    iconLucide: MoveHorizontal,
    channel: "movement",
    movementClassName: "avatar-motion-sway",
  },
];

export const AVATAR_ANIMATION_REGISTRY = Object.fromEntries(
  AVATAR_ANIMATIONS.map((animation) => [animation.id, animation]),
) as Readonly<Record<AvatarAnimationId, AvatarAnimationDefinition>>;

export const EYE_ANIMATIONS: readonly AvatarEyeAnimationDefinition[] =
  AVATAR_ANIMATIONS.filter(
    (animation): animation is AvatarEyeAnimationDefinition =>
      animation.channel === "eyes",
  );

export const MOVEMENT_ANIMATIONS: readonly AvatarMovementAnimationDefinition[] =
  AVATAR_ANIMATIONS.filter(
    (animation): animation is AvatarMovementAnimationDefinition =>
      animation.channel === "movement",
  );

export function getAvatarAnimation(
  id: AvatarAnimationId,
): AvatarAnimationDefinition {
  return AVATAR_ANIMATION_REGISTRY[id];
}

/**
 * Movement animations can stack.
 *
 * Eye animations are mutually exclusive because each eye
 * animation controls the same pair of rasterized eye frames.
 */
export function toggleAvatarAnimation(
  current: readonly AvatarAnimationId[],
  id: AvatarAnimationId,
): AvatarAnimationId[] {
  const selected = new Set(current);

  if (selected.has(id)) {
    selected.delete(id);

    return canonicalizeAnimations(selected);
  }

  const definition = AVATAR_ANIMATION_REGISTRY[id];

  if (definition.channel === "eyes") {
    for (const selectedId of selected) {
      const selectedDefinition = AVATAR_ANIMATION_REGISTRY[selectedId];

      if (selectedDefinition.channel === "eyes") {
        selected.delete(selectedId);
      }
    }
  }

  selected.add(id);

  return canonicalizeAnimations(selected);
}

/**
 * Keep animation IDs in a deterministic order.
 *
 * This makes persistence, copied JSON, undo/redo comparisons,
 * and tests predictable.
 */
export function canonicalizeAnimations(
  animations: Iterable<AvatarAnimationId>,
): AvatarAnimationId[] {
  const selected = new Set(animations);

  return AVATAR_ANIMATION_IDS.filter((id) => selected.has(id));
}

export function getSelectedEyeAnimation(
  animations: readonly AvatarAnimationId[],
): AvatarEyeAnimationDefinition | null {
  for (const id of animations) {
    const definition = AVATAR_ANIMATION_REGISTRY[id];

    if (definition.channel === "eyes") {
      return definition;
    }
  }

  return null;
}

export function getSelectedMovementAnimations(
  animations: readonly AvatarAnimationId[],
): AvatarMovementAnimationDefinition[] {
  const result: AvatarMovementAnimationDefinition[] = [];

  for (const id of animations) {
    const definition = AVATAR_ANIMATION_REGISTRY[id];

    if (definition.channel === "movement") {
      result.push(definition);
    }
  }

  return result;
}
