import type { ComponentType } from "react";

/**
 * Stable hairstyle IDs.
 *
 * Examples:
 * - hair-short-side-part
 * - hair-medium-curly
 * - hair-long-straight
 */
export type HairStyleId = `hair-${string}`;

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
 * They must not apply the global 17° head rotation themselves.
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
