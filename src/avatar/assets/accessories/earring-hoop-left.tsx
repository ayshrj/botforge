import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function EarringHoopLeft({ color }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.earrings.left;
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
