import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function EarringHoopRight({ color, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.earrings.right;
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
