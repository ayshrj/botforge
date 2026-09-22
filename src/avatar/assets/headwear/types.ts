import type { FaceGeometry } from "../../design-system";
import type { ComponentType } from "react";

export const HEADWEAR_IDS = [
  "headwear-baseball-cap",
  "headwear-beanie",
  "headwear-bucket-hat",
  "headwear-wide-brim-hat",
  "headwear-headband",
  "headwear-hood",
  "headwear-crown",
  "headwear-headphones",
] as const;

export type HeadwearId = (typeof HEADWEAR_IDS)[number];
export type HeadwearSelectionId = HeadwearId | "headwear-none";

export interface HeadwearProps {
  anchors?: FaceGeometry["anchors"];
  /**
   * Main recolorable surface.
   *
   * Defaults to currentColor so a parent <g> may control color.
   */
  primaryColor?: string;

  /**
   * Optional broad secondary flat shade.
   * Falls back to primaryColor.
   */
  secondaryColor?: string;

  /**
   * Optional small accent color.
   * Falls back to secondaryColor/primaryColor.
   */
  accentColor?: string;
}

export type HeadwearComponent = ComponentType<HeadwearProps>;

export type HeadwearHairInteraction =
  | "covers-upper-hair"
  | "overlays-forehead"
  | "frames-hair"
  | "sits-over-hair";

export interface HeadwearAsset {
  id: HeadwearId;
  label: string;
  Component: HeadwearComponent;

  /**
   * Descriptive metadata only.
   * Hairstyles remain independent assets.
   */
  hairInteraction: HeadwearHairInteraction;
  fit?: "tapered-crown" | "hood";
}
