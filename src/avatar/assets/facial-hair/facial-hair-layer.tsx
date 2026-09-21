import type { FacialHairSelectionId } from "./types";
import { FACIAL_HAIR_REGISTRY } from "./registry";

export interface FacialHairLayerProps {
  facialHair: FacialHairSelectionId;
  color: string;
}

export function FacialHairLayer({ facialHair, color }: FacialHairLayerProps) {
  if (facialHair === "facial-hair-none") {
    return null;
  }

  const { Component } = FACIAL_HAIR_REGISTRY[facialHair];

  return <Component color={color} />;
}
