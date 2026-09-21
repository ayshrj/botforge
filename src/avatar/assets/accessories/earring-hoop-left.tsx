import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function EarringHoopLeft({ color }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.anchors.feature.earrings.left;
  return (
    <ellipse
      aria-hidden="true"
      cx={p.x - 2}
      cy={p.y + 13}
      rx={12}
      ry={18}
      fill="none"
      stroke={color}
      strokeWidth={6}
    />
  );
}
