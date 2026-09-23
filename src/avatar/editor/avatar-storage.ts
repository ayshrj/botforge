import {
  AVATAR_ANIMATION_IDS,
  type AvatarAnimationId,
} from "../animation/types";

import {
  AVATAR_ANIMATION_REGISTRY,
  canonicalizeAnimations,
} from "../animation/registry";

import { ACCESSORY_ASSET_IDS } from "../assets/accessories/types";

import { EAR_ASSET_IDS } from "../assets/ears/types";

import { FACE_SHAPE_IDS } from "../assets/faces/types";

import { FACIAL_HAIR_REGISTRY } from "../assets/facial-hair/registry";

import { GLASSES_IDS } from "../assets/glasses/types";

import { HAIR_STYLE_IDS } from "../assets/hair/types";

import { HEADWEAR_IDS } from "../assets/headwear/types";

import { DEFAULT_AVATAR_CONFIG, HEAD_POSES, type AvatarConfig } from "../types";

export const AVATAR_STORAGE_KEY = "botforge.avatar.v3";

const LEGACY_V2_STORAGE_KEY = "botforge.avatar.v2";

const LEGACY_V1_STORAGE_KEY = "botforge.avatar.v1";

interface StoredAvatarV3 {
  version: 3;
  avatar: AvatarConfig;
}

interface StoredAvatarLegacy {
  version: 1 | 2;
  avatar: unknown;
}

const colorPattern = /^#[0-9a-f]{6}$/i;

function oneOf<T extends string>(
  value: unknown,
  values: readonly T[],
): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function parseAnimationSelection(value: unknown): AvatarAnimationId[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const ids: AvatarAnimationId[] = [];

  for (const item of value) {
    if (!oneOf(item, AVATAR_ANIMATION_IDS)) {
      return null;
    }

    if (!ids.includes(item)) {
      ids.push(item);
    }
  }

  const eyeCount = ids.filter(
    (id) => AVATAR_ANIMATION_REGISTRY[id].channel === "eyes",
  ).length;

  if (eyeCount > 1) {
    return null;
  }

  return canonicalizeAnimations(ids);
}

function migrateSingleAnimation(value: unknown): AvatarAnimationId[] {
  switch (value) {
    case "animation-none":
      return [];

    case "animation-blink":
      return ["animation-blink"];

    case "animation-breathe":
      return ["animation-breathe"];

    case "animation-float":
      return ["animation-float"];

    case "animation-sway":
      return ["animation-sway"];

    case "animation-wink":
      return ["animation-wink-left"];

    case "animation-idle":
      return ["animation-blink", "animation-breathe"];

    default:
      return [...DEFAULT_AVATAR_CONFIG.animations];
  }
}

function parseAvatarConfigInternal(
  value: unknown,
  animationOverride?: readonly AvatarAnimationId[],
): AvatarConfig | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  const facialHairIds = Object.keys(FACIAL_HAIR_REGISTRY);

  const animations =
    animationOverride !== undefined
      ? canonicalizeAnimations(animationOverride)
      : parseAnimationSelection(candidate.animations);

  if (!animations) {
    return null;
  }

  if (
    !oneOf(candidate.headPose, HEAD_POSES) ||
    !oneOf(candidate.faceShape, FACE_SHAPE_IDS) ||
    !oneOf(candidate.hairStyle, [...HAIR_STYLE_IDS, "hair-none"]) ||
    !oneOf(candidate.glasses, [...GLASSES_IDS, "glasses-none"]) ||
    !oneOf(candidate.facialHair, [...facialHairIds, "facial-hair-none"]) ||
    !oneOf(candidate.headwear, [...HEADWEAR_IDS, "headwear-none"]) ||
    !oneOf(candidate.ears, EAR_ASSET_IDS) ||
    !oneOf(candidate.accessory, [...ACCESSORY_ASSET_IDS, "accessory-none"])
  ) {
    return null;
  }

  const colors = [
    "background",
    "skinColor",
    "hairColor",
    "glassesColor",
    "facialHairColor",
    "headwearColor",
    "accessoryColor",
    "blushColor",
  ] as const;

  if (
    colors.some((key) => {
      const color = candidate[key];

      return typeof color !== "string" || !colorPattern.test(color);
    })
  ) {
    return null;
  }

  return {
    ...DEFAULT_AVATAR_CONFIG,
    ...candidate,
    animations,
  } as AvatarConfig;
}

/**
 * Parses a current v3 AvatarConfig object.
 */
export function parseAvatarConfig(value: unknown): AvatarConfig | null {
  return parseAvatarConfigInternal(value);
}

function parseStoredAvatar(raw: string): AvatarConfig | null {
  try {
    const stored = JSON.parse(raw) as
      | Partial<StoredAvatarV3>
      | Partial<StoredAvatarLegacy>;

    if (stored.version === 3) {
      return parseAvatarConfig(stored.avatar);
    }

    if (stored.version === 2) {
      const avatar = stored.avatar;

      if (!avatar || typeof avatar !== "object") {
        return null;
      }

      const candidate = avatar as Record<string, unknown>;

      return parseAvatarConfigInternal(
        candidate,
        migrateSingleAnimation(candidate.animation),
      );
    }

    if (stored.version === 1) {
      return parseAvatarConfigInternal(
        stored.avatar,
        DEFAULT_AVATAR_CONFIG.animations,
      );
    }

    return null;
  } catch {
    return null;
  }
}

export function loadAvatarConfig(): AvatarConfig | null {
  try {
    const current = localStorage.getItem(AVATAR_STORAGE_KEY);

    if (current) {
      return parseStoredAvatar(current);
    }

    const v2 = localStorage.getItem(LEGACY_V2_STORAGE_KEY);

    if (v2) {
      const migrated = parseStoredAvatar(v2);

      if (migrated) {
        saveAvatarConfig(migrated);

        return migrated;
      }
    }

    const v1 = localStorage.getItem(LEGACY_V1_STORAGE_KEY);

    if (v1) {
      const migrated = parseStoredAvatar(v1);

      if (migrated) {
        saveAvatarConfig(migrated);

        return migrated;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function saveAvatarConfig(avatar: AvatarConfig): void {
  const value: StoredAvatarV3 = {
    version: 3,
    avatar,
  };

  localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(value));
}

export function serializeAvatarConfig(avatar: AvatarConfig): string {
  return JSON.stringify(
    {
      version: 3,
      avatar,
    } satisfies StoredAvatarV3,
    null,
    2,
  );
}
