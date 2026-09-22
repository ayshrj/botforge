import type { FacialHairLayerProps } from "./types";
import { BeardCoverage } from "./beard-coverage";

export function BeardFull({ color }: FacialHairLayerProps) {
  return <BeardCoverage color={color} profile="full" />;
}
