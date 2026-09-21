import { createElement } from "react";

import { BotAvatar } from "../bot-avatar";
import type { AvatarAssetRegistry } from "../asset-registry";
import type { AvatarConfig } from "../types";

import { faceAssetRegistry } from "../assets/faces/registry";
import { hairAssets } from "../assets/hair/registry";
import type { HairAsset } from "../assets/hair/types";
import { GLASSES_REGISTRY } from "../assets/glasses/registry";
import { FACIAL_HAIR_REGISTRY } from "../assets/facial-hair/registry";
import { HEADWEAR_REGISTRY } from "../assets/headwear/registry";
import { EAR_ASSET_REGISTRY } from "../assets/ears/registry";
import { ACCESSORY_ASSET_REGISTRY } from "../assets/accessories/registry";

export { BotAvatar };
export type { AvatarConfig };

export const avatarEditorRegistries = {
  face: faceAssetRegistry,
  hair: Object.fromEntries(hairAssets.map((asset) => [asset.id, asset])),
  glasses: GLASSES_REGISTRY,
  facialHair: FACIAL_HAIR_REGISTRY,
  headwear: HEADWEAR_REGISTRY,
  ears: EAR_ASSET_REGISTRY,
  accessory: ACCESSORY_ASSET_REGISTRY,
} as const;

const glassesAnchors = {
  leftEye: { cx: 166, cy: 281, width: 32, height: 86 },
  rightEye: { cx: 278, cy: 281, width: 32, height: 86 },
  faceBounds: { left: 30, top: 104, right: 406, bottom: 480 },
} as const;

export const avatarEditorAssetRegistry: AvatarAssetRegistry = {
  hairStyle: Object.fromEntries(
    (hairAssets as readonly HairAsset[]).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          "hair-back": asset.back
            ? ({ config }: { config: Readonly<AvatarConfig> }) =>
                createElement(asset.back!, { hairColor: config.hairColor })
            : undefined,
          "hair-front": asset.front
            ? ({ config }: { config: Readonly<AvatarConfig> }) =>
                createElement(asset.front!, { hairColor: config.hairColor })
            : undefined,
        },
      },
    ]),
  ),
  glasses: Object.fromEntries(
    Object.values(GLASSES_REGISTRY).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          glasses: () =>
            createElement(asset.Component, {
              frameColor: "#171719",
              anchors: glassesAnchors,
            }),
        },
      },
    ]),
  ),
  facialHair: Object.fromEntries(
    Object.values(FACIAL_HAIR_REGISTRY).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          "facial-hair": ({ config }: { config: Readonly<AvatarConfig> }) =>
            createElement(asset.Component, { color: config.hairColor }),
        },
      },
    ]),
  ),
  headwear: Object.fromEntries(
    Object.values(HEADWEAR_REGISTRY).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          headwear: ({ config }: { config: Readonly<AvatarConfig> }) =>
            createElement(asset.Component, { primaryColor: config.hairColor }),
        },
      },
    ]),
  ),
  ears: Object.fromEntries(
    Object.values(EAR_ASSET_REGISTRY).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          ears: ({ config }: { config: Readonly<AvatarConfig> }) =>
            createElement(asset.Component, { skinColor: config.skinColor }),
        },
      },
    ]),
  ),
  accessory: Object.fromEntries(
    Object.values(ACCESSORY_ASSET_REGISTRY).map((asset) => [
      asset.id,
      {
        id: asset.id,
        layers: {
          [asset.layer]: ({ config }: { config: Readonly<AvatarConfig> }) =>
            createElement(asset.Component, { color: config.hairColor }),
        },
      },
    ]),
  ),
};
