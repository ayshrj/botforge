import type { ComponentType } from "react";

export type FacialHairId =
  | "beard-stubble"
  | "beard-short"
  | "beard-medium"
  | "beard-full"
  | "beard-goatee"
  | "moustache-basic"
  | "moustache-handlebar-soft"
  | "beard-moustache-short"
  | "beard-moustache-full";

export type FacialHairSelectionId = FacialHairId | "facial-hair-none";

export type FacialHairKind = "beard" | "moustache" | "beard-moustache";

export interface FacialHairLayerProps {
  color: string;
}

export type FacialHairComponent = ComponentType<FacialHairLayerProps>;

export interface FacialHairAsset {
  id: FacialHairId;
  label: string;
  kind: FacialHairKind;
  Component: FacialHairComponent;
}
