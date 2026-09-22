import type { FacialHairLayerProps } from "./types";
import { BeardCoverage } from "./beard-coverage";

export function BeardStubble({ color }: FacialHairLayerProps) {
  return <BeardCoverage color={color} profile="stubble" />;
}
