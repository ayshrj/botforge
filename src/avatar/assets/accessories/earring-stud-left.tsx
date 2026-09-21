import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function EarringStudLeft({ color }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.earrings.left;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
