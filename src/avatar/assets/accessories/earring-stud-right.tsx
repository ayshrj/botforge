import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function EarringStudRight({ color }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.earrings.right;
  return <circle aria-hidden="true" cx={p.x} cy={p.y} r={7} fill={color} />;
}
