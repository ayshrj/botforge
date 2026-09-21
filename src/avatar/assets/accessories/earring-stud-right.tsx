import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function EarringStudRight({ color }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.anchors.feature.earrings.right;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
