import { HeadwearBaseballCap } from "./headwear-baseball-cap";
import { HeadwearBeanie } from "./headwear-beanie";
import { HeadwearBucketHat } from "./headwear-bucket-hat";
import { HeadwearWideBrimHat } from "./headwear-wide-brim-hat";
import { HeadwearHeadband } from "./headwear-headband";
import { HeadwearHood } from "./headwear-hood";
import { HeadwearCrown } from "./headwear-crown";
import { HeadwearHeadphones } from "./headwear-headphones";

import type { HeadwearAsset, HeadwearId } from "./types";

export const HEADWEAR_REGISTRY = {
  "headwear-baseball-cap": {
    id: "headwear-baseball-cap",
    label: "Baseball Cap",
    Component: HeadwearBaseballCap,
    hairInteraction: "covers-upper-hair",
  },

  "headwear-beanie": {
    id: "headwear-beanie",
    label: "Beanie",
    Component: HeadwearBeanie,
    hairInteraction: "covers-upper-hair",
  },

  "headwear-bucket-hat": {
    id: "headwear-bucket-hat",
    label: "Bucket Hat",
    Component: HeadwearBucketHat,
    hairInteraction: "covers-upper-hair",
  },

  "headwear-wide-brim-hat": {
    id: "headwear-wide-brim-hat",
    label: "Wide Brim Hat",
    Component: HeadwearWideBrimHat,
    hairInteraction: "covers-upper-hair",
  },

  "headwear-headband": {
    id: "headwear-headband",
    label: "Headband",
    Component: HeadwearHeadband,
    hairInteraction: "overlays-forehead",
  },

  "headwear-hood": {
    id: "headwear-hood",
    label: "Hood",
    Component: HeadwearHood,
    hairInteraction: "frames-hair",
  },

  "headwear-crown": {
    id: "headwear-crown",
    label: "Crown",
    Component: HeadwearCrown,
    hairInteraction: "sits-over-hair",
  },

  "headwear-headphones": {
    id: "headwear-headphones",
    label: "Headphones",
    Component: HeadwearHeadphones,
    hairInteraction: "sits-over-hair",
  },
} satisfies Record<HeadwearId, HeadwearAsset>;

export function getHeadwearAsset(
  id: HeadwearId | null | undefined,
): HeadwearAsset | null {
  return id ? HEADWEAR_REGISTRY[id] : null;
}
