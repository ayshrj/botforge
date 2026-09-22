import type { FacialHairLayerProps } from "./types";
import { BeardCoverage } from "./beard-coverage";

export function BeardShort({ color }: FacialHairLayerProps) {
  return <BeardCoverage color={color} profile="short" />;
}
