import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function EarringHoopLeft({ color, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.earrings.left;
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
