import type { AccessoryAssetProps } from './types';
import { AVATAR_DESIGN } from "../../design-system";

export function Halo({ color }: AccessoryAssetProps) {
  const p = AVATAR_DESIGN.featureAnchors.halo;
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
