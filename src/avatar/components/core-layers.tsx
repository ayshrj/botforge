import type { FaceShapeId } from "../asset-ids";
import { useId } from "react";
import { mixColor } from "../color-utils";
import { getFaceAsset } from "../assets/faces/registry";
import { AVATAR_DESIGN, type FaceGeometry } from "../design-system";
import { AvatarLayer } from "./avatar-layer";
import { FaceSilhouetteMask } from "./face-silhouette-mask";

export function BackgroundLayer({ fill = AVATAR_DESIGN.colors.background }: { fill?: string }) {
  return <AvatarLayer layer="background"><rect width="512" height="512" fill={fill} /></AvatarLayer>;
}

export function FaceLayer({ faceShape, skinColor, geometry }: { faceShape: FaceShapeId; skinColor: string; geometry: FaceGeometry }) {
  const Face = getFaceAsset(faceShape).Component;
  const maskId = useId().replace(/:/g, "") + "-face-tone";
  const { x, y, width, height } = geometry.face;
  return <AvatarLayer layer="face">
    <defs>
      <FaceSilhouetteMask id={maskId} faceShape={faceShape} geometry={geometry} />
    </defs>
    <g transform={geometry.faceTransform}><Face skinColor={skinColor} /></g>
    <path mask={`url(#${maskId})`} fill={mixColor(skinColor, "#603b42", 0.1)}
      d={`M ${x + width * .8} ${y}
        C ${x + width * 1.08} ${y + height * .57}, ${x + width * .8} ${y + height * .94}, ${x + width * .35} ${y + height}
        L ${x + width} ${y + height} L ${x + width} ${y} Z`} />
  </AvatarLayer>;
}

export function EyesLayer({ geometry }: { geometry: FaceGeometry }) {
  return <AvatarLayer layer="eyes">
    {[geometry.anchors.eyeLeft, geometry.anchors.eyeRight].map((p, i) =>
      <rect key={i} x={p.x - geometry.eyeWidth / 2} y={p.y - geometry.eyeHeight / 2}
        width={geometry.eyeWidth} height={geometry.eyeHeight} rx={geometry.eyeWidth / 2} fill={AVATAR_DESIGN.colors.eyes} />)}
  </AvatarLayer>;
}

export function BlushLayer({ blushColor, skinColor, geometry }: { blushColor: string; skinColor: string; geometry: FaceGeometry }) {
  return <AvatarLayer layer="blush">
    {Object.values(geometry.anchors.cheeks).map((p, i) =>
      <ellipse key={i} cx={p.x} cy={p.y} rx={22} ry={10}
        fill={mixColor(skinColor, blushColor, .55)} opacity=".65" />)}
  </AvatarLayer>;
}
