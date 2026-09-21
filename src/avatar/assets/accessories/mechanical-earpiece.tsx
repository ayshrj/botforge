import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function MechanicalEarpiece({ color, secondaryColor }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.earpiece.right;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y})`}>
      <rect x={-8} y={-35} width={24} height={70} rx={12} fill={color} />
      <rect x={8} y={-21} width={21} height={42} rx={9} fill={secondaryColor ?? color} />
      <circle cx={20} cy={0} r={6} fill={color} />
    </g>
  );
}
