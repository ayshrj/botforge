import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function HairBow({ color, secondaryColor, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.hairAccessory.right;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y}) rotate(14)`}>
      <path d="M-7 0C-26 -25 -50 -23 -55 -5C-59 12 -40 27 -9 12Z" fill={color} />
      <path d="M7 0C26 -25 50 -23 55 -5C59 12 40 27 9 12Z" fill={color} />
      <ellipse cx={0} cy={5} rx={12} ry={14} fill={secondaryColor ?? color} />
    </g>
  );
}
