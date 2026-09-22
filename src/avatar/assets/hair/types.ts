import type { ComponentType } from "react";

/**
 * Stable hairstyle IDs.
 *
 * Examples:
 * - hair-short-side-part
 * - hair-medium-curly
 * - hair-long-straight
 */
export const HAIR_STYLE_IDS = [
  "hair-short-basic", "hair-short-side-part", "hair-short-messy", "hair-buzz",
  "hair-undercut", "hair-slicked-back", "hair-pompadour", "hair-spiky-soft",
  "hair-medium-straight", "hair-medium-center-part", "hair-medium-side-part",
  "hair-medium-wavy", "hair-medium-curly", "hair-curtain", "hair-blunt-bangs",
  "hair-long-straight", "hair-long-side-part", "hair-long-wavy", "hair-long-curly",
  "hair-high-ponytail", "hair-low-ponytail", "hair-bun", "hair-top-knot",
  "hair-afro", "hair-twin-buns", "hair-braided-ponytail", "hair-thick-locks",
  "hair-mohawk-soft",
  "hair-wolf-cut", "hair-sculpted-bob", "hair-pixie-sweep",
] as const;

export type HairStyleId = (typeof HAIR_STYLE_IDS)[number];
export type HairStyleSelectionId = HairStyleId | "hair-none";

/**
 * Props shared by every hairstyle layer.
 *
 * Hair geometry should normally use `currentColor` for its primary fill,
 * with the component root setting `color={hairColor}`.
 */
export interface HairLayerProps {
  hairColor: string;
}

/**
 * A React component representing one hair layer.
 *
 * Components render in the canonical 512×512 avatar coordinate system.
 * They must not apply the configured head-pose rotation themselves.
 */
export type HairLayerComponent = ComponentType<HairLayerProps>;

/**
 * One logical hairstyle.
 *
 * A hairstyle can provide:
 * - only a back layer
 * - only a front layer
 * - both back and front layers
 *
 * The registry validates that at least one layer exists.
 */
export interface HairAsset {
  readonly id: HairStyleId;
  readonly back?: HairLayerComponent;
  readonly front?: HairLayerComponent;
}
