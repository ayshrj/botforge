import type { FaceShapeId } from "../asset-ids";
import { getFaceAsset } from "../assets/faces/registry";
import { AVATAR_DESIGN, type FaceGeometry } from "../design-system";
import { AvatarLayer } from "./avatar-layer";

export function BackgroundLayer({ fill = AVATAR_DESIGN.colors.background }: { fill?: string }) {
  return <AvatarLayer layer="background"><rect width="512" height="512" fill={fill} /></AvatarLayer>;
}

export function FaceLayer({ faceShape, skinColor, geometry }: { faceShape: FaceShapeId; skinColor: string; geometry: FaceGeometry }) {
  const Face = getFaceAsset(faceShape).Component;
  return <AvatarLayer layer="face"><g transform={geometry.faceTransform}><Face skinColor={skinColor} /></g></AvatarLayer>;
}

export function EyesLayer({ geometry }: { geometry: FaceGeometry }) {
  return <AvatarLayer layer="eyes">
    {[geometry.anchors.eyeLeft, geometry.anchors.eyeRight].map((p, i) =>
      <rect key={i} x={p.x - geometry.eyeWidth / 2} y={p.y - geometry.eyeHeight / 2}
        width={geometry.eyeWidth} height={geometry.eyeHeight} rx={geometry.eyeWidth / 2} fill={AVATAR_DESIGN.colors.eyes} />)}
  </AvatarLayer>;
}

export function BlushLayer({ blushColor, geometry }: { blushColor: string; geometry: FaceGeometry }) {
  return <AvatarLayer layer="blush">
    {Object.values(geometry.anchors.cheeks).map((p, i) =>
      <ellipse key={i} cx={p.x} cy={p.y} rx={22} ry={10} fill={blushColor} opacity=".4" />)}
  </AvatarLayer>;
}
