import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function SmallHorns({ color, secondaryColor, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const { left, right } = anchors.headTop;
  const horn = 'M0 12C-10 3 -14 -9 -10 -22L6 -53C8 -34 19 -18 24 -7C28 3 17 13 0 12Z';
  const inset = 'M5 3C1 -2 0 -9 3 -16L10 -30C12 -21 17 -12 19 -6C21 -1 14 4 5 3Z';

  const renderHorn = (transform: string) => (
    <g transform={transform}>
      <path d={horn} fill={color} />
      {secondaryColor ? <path d={inset} fill={secondaryColor} /> : null}
    </g>
  );

  return (
    <g aria-hidden="true">
      {renderHorn(`translate(${left.x + 9} ${left.y - 12}) rotate(-8)`)}
      {renderHorn(`translate(${right.x - 9} ${right.y - 12}) scale(-1 1) rotate(-8)`)}
    </g>
  );
}
