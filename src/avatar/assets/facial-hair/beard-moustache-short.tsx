import type { FacialHairLayerProps } from "./types";
import { BeardShort } from "./beard-short";
import { MoustacheBasic } from "./moustache-basic";

export function BeardMoustacheShort({ color }: FacialHairLayerProps) {
  return (
    <g aria-hidden="true" pointerEvents="none">
      <BeardShort color={color} />
      <MoustacheBasic color={color} />
    </g>
  );
}
