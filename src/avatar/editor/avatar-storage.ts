import { HEAD_POSES, type AvatarConfig } from "../types";
import { DEFAULT_AVATAR_CONFIG } from "../types";
import { FACE_SHAPE_IDS } from "../assets/faces/types";
import { HAIR_STYLE_IDS } from "../assets/hair/types";
import { GLASSES_IDS } from "../assets/glasses/types";
import { HEADWEAR_IDS } from "../assets/headwear/types";
import { EAR_ASSET_IDS } from "../assets/ears/types";
import { ACCESSORY_ASSET_IDS } from "../assets/accessories/types";
import { FACIAL_HAIR_REGISTRY } from "../assets/facial-hair/registry";

export const AVATAR_STORAGE_KEY = "botforge.avatar.v1";

interface StoredAvatar {
  version: 1;
  avatar: AvatarConfig;
}

const colorPattern = /^#[0-9a-f]{6}$/i;

function oneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && values.includes(value as T);
}

export function parseAvatarConfig(value: unknown): AvatarConfig | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  const facialHairIds = Object.keys(FACIAL_HAIR_REGISTRY);

  if (
    !oneOf(candidate.headPose, HEAD_POSES) ||
    !oneOf(candidate.faceShape, FACE_SHAPE_IDS) ||
    !oneOf(candidate.hairStyle, [...HAIR_STYLE_IDS, "hair-none"]) ||
    !oneOf(candidate.glasses, [...GLASSES_IDS, "glasses-none"]) ||
    !oneOf(candidate.facialHair, [...facialHairIds, "facial-hair-none"]) ||
    !oneOf(candidate.headwear, [...HEADWEAR_IDS, "headwear-none"]) ||
    !oneOf(candidate.ears, EAR_ASSET_IDS) ||
    !oneOf(candidate.accessory, [...ACCESSORY_ASSET_IDS, "accessory-none"])
  ) return null;

  const colors = ["background", "skinColor", "hairColor", "glassesColor", "facialHairColor", "headwearColor", "accessoryColor", "blushColor"] as const;
  if (colors.some((key) => typeof candidate[key] !== "string" || !colorPattern.test(candidate[key]))) return null;

  return { ...DEFAULT_AVATAR_CONFIG, ...candidate } as AvatarConfig;
}

export function loadAvatarConfig(): AvatarConfig | null {
  try {
    const raw = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<StoredAvatar>;
    return stored.version === 1 ? parseAvatarConfig(stored.avatar) : null;
  } catch {
    return null;
  }
}

export function saveAvatarConfig(avatar: AvatarConfig): void {
  const value: StoredAvatar = { version: 1, avatar };
  localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(value));
}

export function serializeAvatarConfig(avatar: AvatarConfig): string {
  return JSON.stringify({ version: 1, avatar } satisfies StoredAvatar, null, 2);
}
