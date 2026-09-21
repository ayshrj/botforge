export type {
  FacialHairAsset,
  FacialHairComponent,
  FacialHairId,
  FacialHairKind,
  FacialHairLayerProps as FacialHairAssetProps,
} from "./types";

export {
  FACIAL_HAIR_ASSETS,
  FACIAL_HAIR_REGISTRY,
  getFacialHairAsset,
} from "./registry";

export { FacialHairLayer, type FacialHairLayerProps } from "./facial-hair-layer";

export { BeardStubble } from "./beard-stubble";
export { BeardShort } from "./beard-short";
export { BeardMedium } from "./beard-medium";
export { BeardFull } from "./beard-full";
export { BeardGoatee } from "./beard-goatee";
export { MoustacheBasic } from "./moustache-basic";
export { MoustacheHandlebarSoft } from "./moustache-handlebar-soft";
export { BeardMoustacheShort } from "./beard-moustache-short";
export { BeardMoustacheFull } from "./beard-moustache-full";
