import type { EarAssetProps } from './types';
import { BOTFORGE_FEATURE_ANCHORS } from '../shared/feature-anchors';

interface SideEarPairProps extends EarAssetProps {
  outerPath: string;
  innerPath?: string;
}

export function SideEarPair({
  skinColor,
  innerColor,
  outerPath,
  innerPath,
}: SideEarPairProps) {
  const { left, right } = BOTFORGE_FEATURE_ANCHORS.ears;

  const renderEar = (transform: string) => (
    <g transform={transform}>
      <path d={outerPath} fill={skinColor} />
      {innerColor && innerPath ? <path d={innerPath} fill={innerColor} /> : null}
    </g>
  );

  return (
    <g aria-hidden="true">
      {renderEar(`translate(${left.x} ${left.y})`)}
      {renderEar(`translate(${right.x} ${right.y}) scale(-1 1)`)}
    </g>
  );
}
