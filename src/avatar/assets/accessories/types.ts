import type { ComponentType } from 'react';

export const ACCESSORY_ASSET_IDS = [
  'earring-stud-left',
  'earring-stud-right',
  'earring-hoop-left',
  'earring-hoop-right',
  'hairclip-basic',
  'hair-bow',
  'antenna-basic',
  'mechanical-earpiece',
  'small-horns',
  'halo',
] as const;

export type AccessoryAssetId = (typeof ACCESSORY_ASSET_IDS)[number];
export type AccessorySelectionId = AccessoryAssetId | "accessory-none";
export type AccessoryRenderLayer = 'headwear' | 'foreground-accessories';

export interface AccessoryAssetProps {
  color: string;
  secondaryColor?: string;
}

export interface AccessoryAssetDefinition {
  id: AccessoryAssetId;
  layer: AccessoryRenderLayer;
  Component: ComponentType<AccessoryAssetProps>;
}
