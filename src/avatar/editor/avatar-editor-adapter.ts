import { createElement } from "react";

import { BotAvatar } from "../bot-avatar";
import type { AvatarAssetRegistry } from "../asset-registry";
import type { AvatarConfig } from "../types";
import { AVATAR_DESIGN } from "../design-system";

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
  leftEye: {
    cx: AVATAR_DESIGN.eyes.left.x,
    cy: AVATAR_DESIGN.eyes.left.y,
    width: AVATAR_DESIGN.eyes.width,
    height: AVATAR_DESIGN.eyes.height,
  },
  rightEye: {
    cx: AVATAR_DESIGN.eyes.right.x,
    cy: AVATAR_DESIGN.eyes.right.y,
    width: AVATAR_DESIGN.eyes.width,
    height: AVATAR_DESIGN.eyes.height,
  },
  faceBounds: {
    left: AVATAR_DESIGN.face.x,
    top: AVATAR_DESIGN.face.y,
    right: AVATAR_DESIGN.face.x + AVATAR_DESIGN.face.width,
    bottom: AVATAR_DESIGN.face.y + AVATAR_DESIGN.face.height,
  },
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
