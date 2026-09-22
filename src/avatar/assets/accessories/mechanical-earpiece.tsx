import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function MechanicalEarpiece({ color, secondaryColor, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.earpiece.right;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y})`}>
      <rect x={-8} y={-35} width={24} height={70} rx={12} fill={color} />
      <rect x={8} y={-21} width={21} height={42} rx={9} fill={secondaryColor ?? color} />
      <circle cx={20} cy={0} r={6} fill={color} />
    </g>
  );
}
