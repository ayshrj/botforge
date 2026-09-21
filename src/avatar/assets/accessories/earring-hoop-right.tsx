import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function EarringHoopRight({ color }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.featureAnchors.earrings.right;
  return (
    <ellipse
      aria-hidden="true"
      cx={p.x + 2}
      cy={p.y + 13}
      rx={12}
      ry={18}
      fill="none"
      stroke={color}
      strokeWidth={6}
    />
  );
}
