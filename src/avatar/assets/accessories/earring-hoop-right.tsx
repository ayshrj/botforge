import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function EarringHoopRight({ color }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.earrings.right;
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
