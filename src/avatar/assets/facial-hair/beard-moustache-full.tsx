import type { FacialHairLayerProps } from "./types";
import { BeardFull } from "./beard-full";
import { MoustacheBasic } from "./moustache-basic";

export function BeardMoustacheFull({ color }: FacialHairLayerProps) {
  return (
    <g aria-hidden="true" pointerEvents="none">
      <BeardFull color={color} />
      <MoustacheBasic color={color} />
    </g>
  );
}
