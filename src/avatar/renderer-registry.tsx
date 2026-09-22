import type {
  AvatarAssetDefinition,
  AvatarAssetProps,
  AvatarAssetRegistry,
} from "./asset-registry";
import { ACCESSORY_ASSET_REGISTRY } from "./assets/accessories/registry";
import { EAR_ASSET_REGISTRY } from "./assets/ears/registry";
import { faceAssetRegistry } from "./assets/faces/registry";
import { FACIAL_HAIR_REGISTRY } from "./assets/facial-hair/registry";
import { GLASSES_REGISTRY } from "./assets/glasses/registry";
import { hairAssets } from "./assets/hair/registry";
import type { HairAsset } from "./assets/hair/types";
import { HEADWEAR_REGISTRY } from "./assets/headwear/registry";
import { getAccessoryAnchors } from "./design-system";

export const assetCatalog = {
  face: faceAssetRegistry,
  hair: Object.fromEntries(hairAssets.map((asset) => [asset.id, asset])),
  glasses: GLASSES_REGISTRY,
  facialHair: FACIAL_HAIR_REGISTRY,
  headwear: HEADWEAR_REGISTRY,
  ears: EAR_ASSET_REGISTRY,
  accessory: ACCESSORY_ASSET_REGISTRY,
};

function entries<Id extends string>(
  assets: readonly AvatarAssetDefinition<Id>[],
) {
  return Object.fromEntries(assets.map((asset) => [asset.id, asset]));
}

export const avatarAssetRegistry: AvatarAssetRegistry = {
  hairStyle: entries(
    (hairAssets as readonly HairAsset[]).map((asset) => {
      const Back = asset.back;
      const Front = asset.front;

      return {
        id: asset.id,
        layers: {
          "hair-back": Back
            ? ({ config, geometry }: AvatarAssetProps) => (
                <g transform={geometry.hairTransform}>
                  <Back hairColor={config.hairColor} />
                </g>
              )
            : undefined,
          "hair-front": Front
            ? ({ config, geometry }: AvatarAssetProps) => (
                <g transform={geometry.hairTransform}>
                  <Front hairColor={config.hairColor} />
                </g>
              )
            : undefined,
        },
      };
    }),
  ),
  glasses: entries(
    Object.values(GLASSES_REGISTRY).map((asset) => ({
      id: asset.id,
      layers: {
        glasses: ({ config, geometry }: AvatarAssetProps) => (
          <asset.Component
            frameColor={config.glassesColor}
            anchors={geometry.glasses}
          />
        ),
      },
    })),
  ),
  facialHair: entries(
    Object.values(FACIAL_HAIR_REGISTRY).map((asset) => ({
      id: asset.id,
      layers: {
        "facial-hair": ({ config, geometry }: AvatarAssetProps) => (
          <g transform={geometry.beardTransform}>
            <asset.Component color={config.facialHairColor} />
          </g>
        ),
      },
    })),
  ),
  headwear: entries(
    Object.values(HEADWEAR_REGISTRY).map((asset) => ({
      id: asset.id,
      layers: {
        headwear: ({ config, geometry }: AvatarAssetProps) => (
          <g
            transform={
              asset.id === "headwear-headphones"
                ? undefined
                : geometry.headwearTransform
            }
          >
            <asset.Component
              anchors={geometry.anchors}
              primaryColor={config.headwearColor}
              secondaryColor={shade(config.headwearColor, 0.8)}
              accentColor="#F0C875"
            />
          </g>
        ),
      },
    })),
  ),
  ears: entries(
    Object.values(EAR_ASSET_REGISTRY).map((asset) => ({
      id: asset.id,
      layers: {
        ears: ({ config, geometry }: AvatarAssetProps) => (
          <asset.Component
            skinColor={config.skinColor}
            innerColor={shade(config.skinColor, 0.85)}
            anchors={geometry.anchors}
          />
        ),
      },
    })),
  ),
  accessory: entries(
    Object.values(ACCESSORY_ASSET_REGISTRY).map((asset) => ({
      id: asset.id,
      layers: {
        [asset.layer]: ({ config, geometry }: AvatarAssetProps) => (
          <asset.Component
            color={config.accessoryColor}
            secondaryColor={shade(config.accessoryColor, 0.75)}
            anchors={getAccessoryAnchors(config, geometry)}
          />
        ),
      },
    })),
  ),
};

export function shade(hex: string, factor: number) {
  const value = parseInt(hex.slice(1), 16);
  const channelShifts = [16, 8, 0];
  const channels = channelShifts.map((shift) =>
    Math.round(((value >> shift) & 255) * factor)
      .toString(16)
      .padStart(2, "0"),
  );

  return `#${channels.join("")}`;
}
