import type { FacialHairId } from "./types";
import { FACIAL_HAIR_REGISTRY } from "./registry";

export interface FacialHairLayerProps {
  facialHair: FacialHairId | null;
  color: string;
}

export function FacialHairLayer({ facialHair, color }: FacialHairLayerProps) {
  if (!facialHair) {
    return null;
  }

  const { Component } = FACIAL_HAIR_REGISTRY[facialHair];

  return <Component color={color} />;
}
