import type { EarAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

export function EarsBunny({ skinColor, innerColor }: EarAssetProps) {
  const { left, right } = BOTFORGE_FEATURE_ANCHORS.headTop;
  const outer = 'M-2 17C-18 4 -24 -17 -20 -43L-12 -96C-9 -116 2 -126 14 -120C28 -113 31 -92 27 -67L20 -27C17 -6 11 11 -2 17Z';
  const inner = 'M-3 -1C-10 -12 -11 -29 -8 -47L-2 -88C0 -100 5 -106 10 -103C17 -99 18 -86 16 -71L11 -34C9 -18 5 -6 -3 -1Z';

  const ear = (transform: string) => (
    <g transform={transform}>
      <path d={outer} fill={skinColor} />
      {innerColor ? <path d={inner} fill={innerColor} /> : null}
    </g>
  );

  return (
    <g aria-hidden="true">
      {ear(`translate(${left.x - 8} ${left.y - 4}) rotate(-8)`)}
      {ear(`translate(${right.x + 8} ${right.y - 4}) scale(-1 1) rotate(-8)`)}
    </g>
  );
}
