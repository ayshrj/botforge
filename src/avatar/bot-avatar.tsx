import type { ReactElement, SVGProps } from "react";

import {
  EMPTY_AVATAR_ASSET_REGISTRY,
  type AvatarAssetDefinition,
  type AvatarAssetRegistry,
} from "./asset-registry";
import { AVATAR_DESIGN } from "./design-system";
import type { AvatarConfig } from "./types";

import {
  AVATAR_HEAD_LAYER_ORDER,
  type AvatarHeadLayerId,
} from "./components/avatar-layer";

import {
  BackgroundLayer,
  BlushLayer,
  EyesLayer,
  FaceLayer,
} from "./components/core-layers";

import { HeadRotationGroup } from "./components/head-rotation-group";
import { RegisteredAssetLayer } from "./components/registered-asset-layer";

export interface BotAvatarProps extends Omit<
  SVGProps<SVGSVGElement>,
  "children" | "viewBox"
> {
  config: Readonly<AvatarConfig>;

  /**
   * Optional so the core renderer works before any modular
   * assets have been created.
   */
  registry?: AvatarAssetRegistry;
}

export function BotAvatar({
  config,
  registry = EMPTY_AVATAR_ASSET_REGISTRY,
  width = AVATAR_DESIGN.canvas.width,
  height = AVATAR_DESIGN.canvas.height,
  ...svgProps
}: BotAvatarProps) {
  const selectedAssets: readonly (AvatarAssetDefinition | undefined)[] = [
    registry.hairStyle[config.hairStyle],
    registry.ears[config.ears],
    registry.facialHair[config.facialHair],
    registry.glasses[config.glasses],
    registry.headwear[config.headwear],
    registry.accessory[config.accessory],
  ];

  function renderHeadLayer(layer: AvatarHeadLayerId): ReactElement {
    switch (layer) {
      case "face":
        return (
          <FaceLayer
            key={layer}
            faceShape={config.faceShape}
            skinColor={config.skinColor}
          />
        );

      case "blush":
        return <BlushLayer key={layer} blushColor={config.blushColor} />;

      case "eyes":
        return <EyesLayer key={layer} />;

      default:
        return (
          <RegisteredAssetLayer
            key={layer}
            layer={layer}
            config={config}
            assets={selectedAssets}
          />
        );
    }
  }

  return (
    <svg
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={AVATAR_DESIGN.canvas.viewBox}
      width={width}
      height={height}
      shapeRendering="geometricPrecision"
      data-botforge-avatar
    >
      <BackgroundLayer />

      <HeadRotationGroup>
        {AVATAR_HEAD_LAYER_ORDER.map(renderHeadLayer)}
      </HeadRotationGroup>
    </svg>
  );
}
