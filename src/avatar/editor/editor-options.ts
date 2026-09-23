import {
  avatarEditorRegistries,
  type AvatarConfig,
} from "./avatar-editor-adapter";

import { DEFAULT_AVATAR_CONFIG } from "../types";

export type EditorCategoryId =
  | "pose"
  | "face"
  | "skin"
  | "hair"
  | "hairColor"
  | "glasses"
  | "facialHair"
  | "headwear"
  | "ears"
  | "accessories"
  | "background"
  | "animation";

export interface EditorCategory {
  id: EditorCategoryId;
  label: string;
  icon: string;
}

export interface ColorOption {
  id: string;
  label: string;
  value: string;
}

export const editorCategories: readonly EditorCategory[] = [
  {
    id: "pose",
    label: "Pose",
    icon: "↗",
  },
  {
    id: "face",
    label: "Face",
    icon: "◯",
  },
  {
    id: "skin",
    label: "Skin",
    icon: "●",
  },
  {
    id: "hair",
    label: "Hair",
    icon: "⌁",
  },
  {
    id: "hairColor",
    label: "Color",
    icon: "◐",
  },
  {
    id: "glasses",
    label: "Glasses",
    icon: "∞",
  },
  {
    id: "facialHair",
    label: "Beard",
    icon: "⌄",
  },
  {
    id: "headwear",
    label: "Hats",
    icon: "⌃",
  },
  {
    id: "ears",
    label: "Ears",
    icon: "◖",
  },
  {
    id: "accessories",
    label: "Extras",
    icon: "✦",
  },
  {
    id: "background",
    label: "Backdrop",
    icon: "▣",
  },
  {
    id: "animation",
    label: "Animate",
    icon: "◌",
  },
] as const;

export const poseOptions = [
  {
    id: "upright",
    label: "Upright",
  },
  {
    id: "tilt-left-soft",
    label: "Lean left",
  },
  {
    id: "tilt-right-soft",
    label: "Lean right",
  },
  {
    id: "tilt-left-strong",
    label: "Bold left",
  },
  {
    id: "tilt-right-strong",
    label: "Bold right",
  },
] as const;

export const backgroundColorOptions: readonly ColorOption[] = [
  {
    id: "background-lilac",
    label: "Soft Lilac",
    value: "#E9DFF5",
  },
  {
    id: "background-sunrise",
    label: "Sunrise",
    value: "#F7D9C4",
  },
  {
    id: "background-mint",
    label: "Mint",
    value: "#CFEBDD",
  },
  {
    id: "background-sky",
    label: "Sky",
    value: "#CFE4F7",
  },
  {
    id: "background-butter",
    label: "Butter",
    value: "#F5E7B2",
  },
  {
    id: "background-charcoal",
    label: "Charcoal",
    value: "#24212B",
  },
];

export const accentColorOptions: readonly ColorOption[] = [
  {
    id: "accent-ink",
    label: "Ink",
    value: "#393044",
  },
  {
    id: "accent-plum",
    label: "Plum",
    value: "#7961A8",
  },
  {
    id: "accent-berry",
    label: "Berry",
    value: "#A64D79",
  },
  {
    id: "accent-rust",
    label: "Rust",
    value: "#A75D3C",
  },
  {
    id: "accent-gold",
    label: "Gold",
    value: "#D9A54D",
  },
  {
    id: "accent-teal",
    label: "Teal",
    value: "#3E8377",
  },
];

export const skinColorOptions: readonly ColorOption[] = [
  {
    id: "skin-porcelain",
    label: "Porcelain",
    value: "#F6D6C5",
  },
  {
    id: "skin-light",
    label: "Light",
    value: "#EDC4AA",
  },
  {
    id: "skin-peach",
    label: "Peach",
    value: "#E5AE8C",
  },
  {
    id: "skin-warm",
    label: "Warm",
    value: "#D99B73",
  },
  {
    id: "skin-tan",
    label: "Tan",
    value: "#C9825F",
  },
  {
    id: "skin-brown",
    label: "Brown",
    value: "#A96346",
  },
  {
    id: "skin-deep",
    label: "Deep",
    value: "#784634",
  },
  {
    id: "skin-dark",
    label: "Dark",
    value: "#553126",
  },
] as const;

export const hairColorOptions: readonly ColorOption[] = [
  {
    id: "hair-black",
    label: "Black",
    value: "#171719",
  },
  {
    id: "hair-charcoal",
    label: "Charcoal",
    value: "#29292E",
  },
  {
    id: "hair-dark-brown",
    label: "Dark Brown",
    value: "#493126",
  },
  {
    id: "hair-brown",
    label: "Brown",
    value: "#6A4530",
  },
  {
    id: "hair-chestnut",
    label: "Chestnut",
    value: "#874A31",
  },
  {
    id: "hair-auburn",
    label: "Auburn",
    value: "#9A4937",
  },
  {
    id: "hair-copper",
    label: "Copper",
    value: "#B9673F",
  },
  {
    id: "hair-blonde",
    label: "Blonde",
    value: "#D8B56E",
  },
  {
    id: "hair-light-blonde",
    label: "Light Blonde",
    value: "#E6CF94",
  },
  {
    id: "hair-silver",
    label: "Silver",
    value: "#B9BBC2",
  },
  {
    id: "hair-blue",
    label: "Blue",
    value: "#536FA8",
  },
  {
    id: "hair-pink",
    label: "Pink",
    value: "#C76685",
  },
] as const;

type Registry = Readonly<Record<string, unknown>>;

export function getRegistryIds<T extends string>(
  registry: Registry,
): readonly T[] {
  return Object.keys(registry) as T[];
}

export function humanizeAssetId(id: string): string {
  const prefixes = [
    "face-",
    "hair-",
    "glasses-",
    "beard-",
    "moustache-",
    "headwear-",
    "ears-",
    "accessory-",
    "earring-",
    "animation-",
  ];

  let label = id;

  for (const prefix of prefixes) {
    if (label.startsWith(prefix)) {
      label = label.slice(prefix.length);

      break;
    }
  }

  return label
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const faceOptions = getRegistryIds<
  Extract<AvatarConfig["faceShape"], string>
>(avatarEditorRegistries.face);

export const hairOptions = getRegistryIds<
  Extract<AvatarConfig["hairStyle"], string>
>(avatarEditorRegistries.hair);

export const glassesOptions = getRegistryIds<
  Extract<AvatarConfig["glasses"], string>
>(avatarEditorRegistries.glasses);

export const facialHairOptions = getRegistryIds<
  Extract<AvatarConfig["facialHair"], string>
>(avatarEditorRegistries.facialHair);

export const headwearOptions = getRegistryIds<
  Extract<AvatarConfig["headwear"], string>
>(avatarEditorRegistries.headwear);

export const earOptions = getRegistryIds<Extract<AvatarConfig["ears"], string>>(
  avatarEditorRegistries.ears,
);

export const accessoryOptions = getRegistryIds<
  Extract<AvatarConfig["accessory"], string>
>(avatarEditorRegistries.accessory);

export function createDefaultAvatarConfig(): AvatarConfig {
  return {
    ...DEFAULT_AVATAR_CONFIG,

    // Clone the array so callers never share the default's
    // mutable backing array.
    animations: [...DEFAULT_AVATAR_CONFIG.animations],
  };
}
