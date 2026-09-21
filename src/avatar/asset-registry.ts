import type { ComponentType } from "react";

import type {
  AccessoryId,
  EarsId,
  FacialHairId,
  GlassesId,
  HairStyleId,
  HeadwearId,
} from "./asset-ids";
import type { AvatarHeadLayerId } from "./components/avatar-layer";
import type { AvatarConfig } from "./types";

export interface AvatarAssetProps {
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
    Partial<Record<HairStyleId, AvatarAssetDefinition<HairStyleId>>>
  >;

  readonly glasses: Readonly<
    Partial<Record<GlassesId, AvatarAssetDefinition<GlassesId>>>
  >;

  readonly facialHair: Readonly<
    Partial<Record<FacialHairId, AvatarAssetDefinition<FacialHairId>>>
  >;

  readonly headwear: Readonly<
    Partial<Record<HeadwearId, AvatarAssetDefinition<HeadwearId>>>
  >;

  readonly ears: Readonly<
    Partial<Record<EarsId, AvatarAssetDefinition<EarsId>>>
  >;

  readonly accessory: Readonly<
    Partial<Record<AccessoryId, AvatarAssetDefinition<AccessoryId>>>
  >;
}

/**
 * The core renderer intentionally registers no optional assets.
 *
 * Future asset modules can construct a populated registry conforming
 * to AvatarAssetRegistry and pass it to <BotAvatar registry={...} />.
 */
export const EMPTY_AVATAR_ASSET_REGISTRY: AvatarAssetRegistry = {
  hairStyle: {},
  glasses: {},
  facialHair: {},
  headwear: {},
  ears: {},
  accessory: {},
};
