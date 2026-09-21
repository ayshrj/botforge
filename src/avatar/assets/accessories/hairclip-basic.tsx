import type { AccessoryAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function HairclipBasic({ color, secondaryColor }: AccessoryAssetProps) {
  const p = BOTFORGE_FEATURE_ANCHORS.hairAccessory.left;
  return (
    <g aria-hidden="true" transform={`translate(${p.x} ${p.y}) rotate(-26)`}>
      <rect x={-29} y={-8} width={58} height={16} rx={8} fill={color} />
      {secondaryColor ? <rect x={-13} y={-3} width={26} height={6} rx={3} fill={secondaryColor} /> : null}
    </g>
  );
}
