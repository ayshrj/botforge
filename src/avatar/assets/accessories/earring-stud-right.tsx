import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function EarringStudRight({ color, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.earrings.right;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
