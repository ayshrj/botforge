import type { ReactElement } from "react";

export const FACE_SHAPE_IDS = [
  "face-round",
  "face-oval",
  "face-wide",
  "face-narrow",
  "face-soft-square",
] as const;

export type FaceShapeId = (typeof FACE_SHAPE_IDS)[number];

export interface FaceAssetProps {
  /** Flat fill used for the complete face silhouette. */
  skinColor: string;
}

export type FaceAssetComponent = (props: FaceAssetProps) => ReactElement;

export interface FaceAssetDefinition {
  id: FaceShapeId;
  Component: FaceAssetComponent;
}
