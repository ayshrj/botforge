import type { FaceGeometry } from "../../design-system";
import type { ComponentType } from 'react';

export const EAR_ASSET_IDS = [
  'ears-standard',
  'ears-small',
  'ears-large',
  'ears-pointed',
  'ears-cat',
  'ears-bunny',
] as const;

export type EarAssetId = (typeof EAR_ASSET_IDS)[number];

export interface EarAssetProps {
  anchors?: FaceGeometry["anchors"];
  skinColor: string;
  innerColor?: string;
}

export interface EarAssetDefinition {
  id: EarAssetId;
  layer: 'ears';
  Component: ComponentType<EarAssetProps>;
}
