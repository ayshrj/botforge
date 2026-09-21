import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function AntennaBasic({ color, secondaryColor }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.featureAnchors.antenna;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y})`}>
      <path d="M0 8C4 -20 2 -48 -10 -76" fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" />
      <circle cx={-10} cy={-79} r={13} fill={secondaryColor ?? color} />
      <rect x={-15} y={2} width={30} height={14} rx={7} fill={color} />
    </g>
  );
}
