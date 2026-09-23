import { useId } from "react";

import type { FaceShapeId } from "../asset-ids";

import { getFaceAsset } from "../assets/faces/registry";

import { mixColor } from "../color-utils";

import { AVATAR_DESIGN, type FaceGeometry } from "../design-system";

import { AvatarLayer } from "./avatar-layer";

import { FaceSilhouetteMask } from "./face-silhouette-mask";

export function BackgroundLayer({
  fill = AVATAR_DESIGN.colors.background,
}: {
  fill?: string;
}) {
  return (
    <AvatarLayer layer="background">
      <rect width="512" height="512" fill={fill} />
    </AvatarLayer>
  );
}

export function FaceLayer({
  faceShape,
  skinColor,
  geometry,
}: {
  faceShape: FaceShapeId;
  skinColor: string;
  geometry: FaceGeometry;
}) {
  const Face = getFaceAsset(faceShape).Component;

  const maskId = useId().replace(/:/g, "") + "-face-tone";

  const { x, y, width, height } = geometry.face;

  return (
    <AvatarLayer layer="face">
      <defs>
        <FaceSilhouetteMask
          id={maskId}
          faceShape={faceShape}
          geometry={geometry}
        />
      </defs>

      <g transform={geometry.faceTransform}>
        <Face skinColor={skinColor} />
      </g>

      <path
        mask={`url(#${maskId})`}
        fill={mixColor(skinColor, "#603b42", 0.1)}
        d={`M ${x + width * 0.8} ${y}
          C ${x + width * 1.08} ${y + height * 0.57},
            ${x + width * 0.8} ${y + height * 0.94},
            ${x + width * 0.35} ${y + height}
          L ${x + width} ${y + height}
          L ${x + width} ${y}
          Z`}
      />
    </AvatarLayer>
  );
}

export function EyesLayer({ geometry }: { geometry: FaceGeometry }) {
  const eyes = [
    {
      id: "left",
      point: geometry.anchors.eyeLeft,
    },
    {
      id: "right",
      point: geometry.anchors.eyeRight,
    },
  ] as const;

  return (
    <AvatarLayer layer="eyes">
      {eyes.map(({ id, point }) => (
        <rect
          key={id}
          data-avatar-eye={id}
          x={point.x - geometry.eyeWidth / 2}
          y={point.y - geometry.eyeHeight / 2}
          width={geometry.eyeWidth}
          height={geometry.eyeHeight}
          rx={geometry.eyeWidth / 2}
          fill={AVATAR_DESIGN.colors.eyes}
        />
      ))}
    </AvatarLayer>
  );
}

export function BlushLayer({
  blushColor,
  skinColor,
  geometry,
}: {
  blushColor: string;
  skinColor: string;
  geometry: FaceGeometry;
}) {
  return (
    <AvatarLayer layer="blush">
      {Object.values(geometry.anchors.cheeks).map((point, index) => (
        <ellipse
          key={index}
          cx={point.x}
          cy={point.y}
          rx={22}
          ry={10}
          fill={mixColor(skinColor, blushColor, 0.55)}
          opacity=".65"
        />
      ))}
    </AvatarLayer>
  );
}
