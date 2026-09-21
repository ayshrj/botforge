import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function EarringStudLeft({ color }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.featureAnchors.earrings.left;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
