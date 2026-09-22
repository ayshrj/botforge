import type { EarAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

interface SideEarPairProps extends EarAssetProps {
  outerPath: string;
  innerPath?: string;
}

export function SideEarPair({
  skinColor,
  anchors = getFaceGeometry("face-round").anchors,
  innerColor,
  outerPath,
  innerPath,
}: SideEarPairProps) {
  const { left, right } = anchors.ears;

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
