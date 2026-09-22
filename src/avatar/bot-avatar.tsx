import { useId, type SVGProps } from "react";

import type { AvatarAssetRegistry } from "./asset-registry";
import { getPresentation } from "./compatibility";
import { AVATAR_DESIGN, getFaceGeometry } from "./design-system";
import { avatarAssetRegistry } from "./renderer-registry";
import type { AvatarConfig } from "./types";
import { AVATAR_HEAD_LAYER_ORDER } from "./components/avatar-layer";
import {
  BackgroundLayer,
  BlushLayer,
  EyesLayer,
  FaceLayer,
} from "./components/core-layers";
import { HeadRotationGroup } from "./components/head-rotation-group";
import { RegisteredAssetLayer } from "./components/registered-asset-layer";
import { FaceSilhouetteMask } from "./components/face-silhouette-mask";

export interface BotAvatarProps
  extends Omit<SVGProps<SVGSVGElement>, "children" | "viewBox"> {
  config: Readonly<AvatarConfig>;
  registry?: AvatarAssetRegistry;
}

export function BotAvatar({
  config,
  registry = avatarAssetRegistry,
  width = AVATAR_DESIGN.canvas.width,
  height = AVATAR_DESIGN.canvas.height,
  ...svgProps
}: BotAvatarProps) {
  const id = useId().replace(/:/g, "");
  const geometry = getFaceGeometry(config.faceShape);
  const presentation = getPresentation(config);
  const selectedAssets = [
    registry.hairStyle[config.hairStyle],
    registry.ears[config.ears],
    registry.facialHair[config.facialHair],
    registry.glasses[config.glasses],
    registry.headwear[config.headwear],
    registry.accessory[config.accessory],
  ];

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
      <defs>
        <FaceSilhouetteMask id={`${id}-face`} faceShape={config.faceShape} geometry={geometry} />
        <clipPath id={`${id}-hair`} clipPathUnits="userSpaceOnUse">
          <rect
            x="-100"
            y={geometry.face.y + 64}
            width="712"
            height="600"
          />
        </clipPath>
      </defs>

      <BackgroundLayer fill={config.background} />

      <HeadRotationGroup pose={config.headPose}>
        {AVATAR_HEAD_LAYER_ORDER.map((layer) => {
          if (layer === "face") {
            return (
              <FaceLayer
                key={layer}
                geometry={geometry}
                faceShape={config.faceShape}
                skinColor={config.skinColor}
              />
            );
          }

          if (layer === "eyes") {
            return <EyesLayer key={layer} geometry={geometry} />;
          }

          if (layer === "blush") {
            return (
              <BlushLayer
                key={layer}
                geometry={geometry}
                blushColor={config.blushColor}
                skinColor={config.skinColor}
              />
            );
          }

          const clipId =
            presentation.cropUpperHair &&
            (layer === "hair-front" || layer === "hair-back")
              ? `${id}-hair`
              : undefined;

          return (
            <g
              key={layer}
              mask={layer === "facial-hair" ? `url(#${id}-face)` : undefined}
              clipPath={clipId ? `url(#${clipId})` : undefined}
            >
              <RegisteredAssetLayer
                layer={layer}
                config={config}
                geometry={geometry}
                assets={selectedAssets}
              />
            </g>
          );
        })}
      </HeadRotationGroup>
    </svg>
  );
}
