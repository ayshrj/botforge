import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function Halo({ color }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.halo;
  return (
    <ellipse
      aria-hidden="true"
      cx={p.x}
      cy={p.y}
      rx={92}
      ry={25}
      fill="none"
      stroke={color}
      strokeWidth={10}
    />
  );
}
