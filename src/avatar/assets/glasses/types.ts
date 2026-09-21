import type { ComponentType, SVGProps } from "react";

export const GLASSES_IDS = [
  "glasses-round",
  "glasses-oval",
  "glasses-square",
  "glasses-rectangle",
  "glasses-browline",
  "glasses-aviator",
  "glasses-cat-eye",
  "glasses-sunglasses-round",
  "glasses-sunglasses-square",
] as const;

export type GlassesId = (typeof GLASSES_IDS)[number];

export interface GlassesEyeAnchor {
  cx: number;
  cy: number;
  width: number;
  height: number;
}

export interface GlassesFaceBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface GlassesAnchors {
  leftEye: GlassesEyeAnchor;
  rightEye: GlassesEyeAnchor;
  faceBounds: GlassesFaceBounds;
}

export interface GlassesAssetProps extends Omit<
  SVGProps<SVGGElement>,
  "color"
> {
  frameColor: string;
  anchors: GlassesAnchors;
}

export type GlassesComponent = ComponentType<GlassesAssetProps>;

export interface GlassesAsset {
  id: GlassesId;
  label: string;
  Component: GlassesComponent;
  tinted: boolean;
}
