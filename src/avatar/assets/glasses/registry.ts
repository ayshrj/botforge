import { GlassesAviator } from "./glasses-aviator";
import { GlassesBrowline } from "./glasses-browline";
import { GlassesCatEye } from "./glasses-cat-eye";
import { GlassesOval } from "./glasses-oval";
import { GlassesRectangle } from "./glasses-rectangle";
import { GlassesRound } from "./glasses-round";
import { GlassesSquare } from "./glasses-square";
import { GlassesSunglassesRound } from "./glasses-sunglasses-round";
import { GlassesSunglassesSquare } from "./glasses-sunglasses-square";

import type { GlassesAsset, GlassesId } from "./types";

export const GLASSES_REGISTRY = {
  "glasses-round": {
    id: "glasses-round",
    label: "Round",
    Component: GlassesRound,
    tinted: false,
  },

  "glasses-oval": {
    id: "glasses-oval",
    label: "Oval",
    Component: GlassesOval,
    tinted: false,
  },

  "glasses-square": {
    id: "glasses-square",
    label: "Square",
    Component: GlassesSquare,
    tinted: false,
  },

  "glasses-rectangle": {
    id: "glasses-rectangle",
    label: "Rectangle",
    Component: GlassesRectangle,
    tinted: false,
  },

  "glasses-browline": {
    id: "glasses-browline",
    label: "Browline",
    Component: GlassesBrowline,
    tinted: false,
  },

  "glasses-aviator": {
    id: "glasses-aviator",
    label: "Aviator",
    Component: GlassesAviator,
    tinted: false,
  },

  "glasses-cat-eye": {
    id: "glasses-cat-eye",
    label: "Cat Eye",
    Component: GlassesCatEye,
    tinted: false,
  },

  "glasses-sunglasses-round": {
    id: "glasses-sunglasses-round",
    label: "Round Sunglasses",
    Component: GlassesSunglassesRound,
    tinted: true,
  },

  "glasses-sunglasses-square": {
    id: "glasses-sunglasses-square",
    label: "Square Sunglasses",
    Component: GlassesSunglassesSquare,
    tinted: true,
  },
} satisfies Record<GlassesId, GlassesAsset>;

export function getGlassesAsset(id: GlassesId): GlassesAsset {
  return GLASSES_REGISTRY[id];
}
