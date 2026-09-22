import type { FacialHairLayerProps } from "./types";
import { BeardCoverage } from "./beard-coverage";

export function BeardMedium({ color }: FacialHairLayerProps) {
  return <BeardCoverage color={color} profile="medium" />;
}
