import type { PropsWithChildren, SVGProps } from "react";

export const AVATAR_LAYER_ORDER = [
  "background",
  "hair-back",
  "ears",
  "neck-collar",
  "face",
  "blush",
  "eyes",
  "facial-hair",
  "hair-front",
  "glasses",
  "headwear",
  "foreground-accessories",
] as const;

export type AvatarLayerId = (typeof AVATAR_LAYER_ORDER)[number];

export type AvatarHeadLayerId = Exclude<AvatarLayerId, "background">;

export const AVATAR_HEAD_LAYER_ORDER: readonly AvatarHeadLayerId[] =
  AVATAR_LAYER_ORDER.filter(
    (layer): layer is AvatarHeadLayerId => layer !== "background",
  );

export interface AvatarLayerProps
  extends PropsWithChildren, Omit<SVGProps<SVGGElement>, "children"> {
  layer: AvatarLayerId;
}

export function AvatarLayer({
  layer,
  children,
  ...groupProps
}: AvatarLayerProps) {
  return (
    <g {...groupProps} data-avatar-layer={layer}>
      {children}
    </g>
  );
}
