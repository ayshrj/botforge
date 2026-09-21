import type { FacialHairAsset, FacialHairId } from "./types";

import { BeardStubble } from "./beard-stubble";
import { BeardShort } from "./beard-short";
import { BeardMedium } from "./beard-medium";
import { BeardFull } from "./beard-full";
import { BeardGoatee } from "./beard-goatee";
import { MoustacheBasic } from "./moustache-basic";
import { MoustacheHandlebarSoft } from "./moustache-handlebar-soft";
import { BeardMoustacheShort } from "./beard-moustache-short";
import { BeardMoustacheFull } from "./beard-moustache-full";

export const FACIAL_HAIR_REGISTRY = {
  "beard-stubble": {
    id: "beard-stubble",
    label: "Stubble",
    kind: "beard",
    Component: BeardStubble,
  },

  "beard-short": {
    id: "beard-short",
    label: "Short Beard",
    kind: "beard",
    Component: BeardShort,
  },

  "beard-medium": {
    id: "beard-medium",
    label: "Medium Beard",
    kind: "beard",
    Component: BeardMedium,
  },

  "beard-full": {
    id: "beard-full",
    label: "Full Beard",
    kind: "beard",
    Component: BeardFull,
  },

  "beard-goatee": {
    id: "beard-goatee",
    label: "Goatee",
    kind: "beard",
    Component: BeardGoatee,
  },

  "moustache-basic": {
    id: "moustache-basic",
    label: "Basic Moustache",
    kind: "moustache",
    Component: MoustacheBasic,
  },

  "moustache-handlebar-soft": {
    id: "moustache-handlebar-soft",
    label: "Soft Handlebar Moustache",
    kind: "moustache",
    Component: MoustacheHandlebarSoft,
  },

  "beard-moustache-short": {
    id: "beard-moustache-short",
    label: "Short Beard + Moustache",
    kind: "beard-moustache",
    Component: BeardMoustacheShort,
  },

  "beard-moustache-full": {
    id: "beard-moustache-full",
    label: "Full Beard + Moustache",
    kind: "beard-moustache",
    Component: BeardMoustacheFull,
  },
} satisfies Record<FacialHairId, FacialHairAsset>;

export const FACIAL_HAIR_ASSETS = Object.values(FACIAL_HAIR_REGISTRY);

export function getFacialHairAsset(id: FacialHairId): FacialHairAsset {
  return FACIAL_HAIR_REGISTRY[id];
}
