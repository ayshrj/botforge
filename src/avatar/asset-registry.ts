import type { FaceGeometry } from "./design-system";
import type { ComponentType } from "react";

import type {
  AccessoryAssetId,
  AccessorySelectionId,
  EarAssetId,
  FacialHairId,
  FacialHairSelectionId,
  GlassesId,
  GlassesSelectionId,
  HairStyleId,
  HairStyleSelectionId,
  HeadwearId,
  HeadwearSelectionId,
} from "./asset-ids";
import type { AvatarHeadLayerId } from "./components/avatar-layer";
import type { AvatarConfig } from "./types";

export interface AvatarAssetProps {
  geometry: FaceGeometry;
  config: Readonly<AvatarConfig>;
}

export type AvatarAssetComponent = ComponentType<AvatarAssetProps>;

export interface AvatarAssetDefinition<Id extends string = string> {
  readonly id: Id;

  readonly layers: Readonly<
    Partial<Record<AvatarHeadLayerId, AvatarAssetComponent>>
  >;
}

export interface AvatarAssetRegistry {
  readonly hairStyle: Readonly<
    Partial<Record<HairStyleSelectionId, AvatarAssetDefinition<HairStyleId>>>
  >;

  readonly glasses: Readonly<
    Partial<Record<GlassesSelectionId, AvatarAssetDefinition<GlassesId>>>
  >;

  readonly facialHair: Readonly<
    Partial<
      Record<FacialHairSelectionId, AvatarAssetDefinition<FacialHairId>>
    >
  >;

  readonly headwear: Readonly<
    Partial<Record<HeadwearSelectionId, AvatarAssetDefinition<HeadwearId>>>
  >;

  readonly ears: Readonly<
    Partial<Record<EarAssetId, AvatarAssetDefinition<EarAssetId>>>
  >;

  readonly accessory: Readonly<
    Partial<
      Record<AccessorySelectionId, AvatarAssetDefinition<AccessoryAssetId>>
    >
  >;
}

/** Empty override for isolated renderer tests or custom registry consumers. */
export const EMPTY_AVATAR_ASSET_REGISTRY: AvatarAssetRegistry = {
  hairStyle: {},
  glasses: {},
  facialHair: {},
  headwear: {},
  ears: {},
  accessory: {},
};
