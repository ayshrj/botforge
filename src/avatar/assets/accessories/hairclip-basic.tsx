import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function HairclipBasic({ color, secondaryColor }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.anchors.feature.hairAccessory.left;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y}) rotate(-26)`}>
      <rect x={-29} y={-8} width={58} height={16} rx={8} fill={color} />
      {secondaryColor ? <rect x={-13} y={-3} width={26} height={6} rx={3} fill={secondaryColor} /> : null}
    </g>
  );
}
