import type { EarAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function EarsCat({ skinColor, innerColor }: EarAssetProps) {
  const { left, right } = AVATAR_DESIGN.anchors.feature.headTop;
  const outer = 'M0 16C-12 7 -22 -3 -28 -18L-35 -70C-12 -59 8 -39 20 -13C24 -4 17 10 0 16Z';
  const inner = 'M-7 -3C-14 -10 -19 -20 -22 -31L-25 -49C-11 -40 1 -27 8 -11C10 -7 4 -2 -7 -3Z';

  const ear = (transform: string) => (
    <g transform={transform}>
      <path d={outer} fill={skinColor} />
      {innerColor ? <path d={inner} fill={innerColor} /> : null}
    </g>
  );

  return (
    <g aria-hidden="true">
      {ear(`translate(${left.x} ${left.y})`)}
      {ear(`translate(${right.x} ${right.y}) scale(-1 1)`)}
    </g>
  );
}
