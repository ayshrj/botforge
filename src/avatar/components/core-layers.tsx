import type { FaceShapeId } from "../asset-ids";
import { getFaceAsset } from "../assets/faces/registry";
import { AVATAR_DESIGN } from "../design-system";
import { AvatarLayer } from "./avatar-layer";

export interface BackgroundLayerProps {
  fill?: string;
}

export function BackgroundLayer({
  fill = AVATAR_DESIGN.colors.background,
}: BackgroundLayerProps) {
  const { width, height } = AVATAR_DESIGN.canvas;

  return (
    <AvatarLayer layer="background">
      <rect x={0} y={0} width={width} height={height} fill={fill} />
    </AvatarLayer>
  );
}

export interface FaceLayerProps {
  faceShape: FaceShapeId;
  skinColor: string;
}

export function FaceLayer({ faceShape, skinColor }: FaceLayerProps) {
  const Face = getFaceAsset(faceShape).Component;

  return (
    <AvatarLayer layer="face">
      <Face skinColor={skinColor} />
    </AvatarLayer>
  );
}

export function EyesLayer() {
  const { eyes } = AVATAR_DESIGN;

  const halfWidth = eyes.width / 2;
  const halfHeight = eyes.height / 2;

  return (
    <AvatarLayer layer="eyes">
      <rect
        x={eyes.left.x - halfWidth}
        y={eyes.left.y - halfHeight}
        width={eyes.width}
        height={eyes.height}
        rx={eyes.cornerRadius}
        ry={eyes.cornerRadius}
        fill={AVATAR_DESIGN.colors.eyes}
      />

      <rect
        x={eyes.right.x - halfWidth}
        y={eyes.right.y - halfHeight}
        width={eyes.width}
        height={eyes.height}
        rx={eyes.cornerRadius}
        ry={eyes.cornerRadius}
        fill={AVATAR_DESIGN.colors.eyes}
      />
    </AvatarLayer>
  );
}

export interface BlushLayerProps {
  blushColor: string;
}

export function BlushLayer({ blushColor }: BlushLayerProps) {
  const { blush } = AVATAR_DESIGN;

  return (
    <AvatarLayer layer="blush">
      <ellipse
        cx={blush.left.x}
        cy={blush.left.y}
        rx={blush.radiusX}
        ry={blush.radiusY}
        fill={blushColor}
      />

      <ellipse
        cx={blush.right.x}
        cy={blush.right.y}
        rx={blush.radiusX}
        ry={blush.radiusY}
        fill={blushColor}
      />
    </AvatarLayer>
  );
}
