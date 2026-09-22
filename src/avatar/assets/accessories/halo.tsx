import type { AccessoryAssetProps } from './types';
import { getFaceGeometry } from "../../design-system";

export function Halo({ color, anchors = getFaceGeometry("face-round").anchors }: AccessoryAssetProps) {
  const p = anchors.halo;
  return (
    <ellipse
      aria-hidden="true"
      cx={p.x}
      cy={p.y}
      rx={92}
      ry={25}
      fill="none"
      stroke={color}
      strokeWidth={10}
    />
  );
}
