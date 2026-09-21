import type { HairAsset } from "./types";

export type HairLayerSlotName = "back" | "front";

export interface HairLayerSlotProps {
  asset: HairAsset | undefined;
  layer: HairLayerSlotName;
  hairColor: string;
}

export function HairLayerSlot({ asset, layer, hairColor }: HairLayerSlotProps) {
  const LayerComponent = asset?.[layer];

  if (!LayerComponent) {
    return null;
  }

  return <LayerComponent hairColor={hairColor} />;
}
