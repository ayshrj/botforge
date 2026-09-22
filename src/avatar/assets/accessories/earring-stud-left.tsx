import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function EarringStudLeft({ color, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.earrings.left;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
