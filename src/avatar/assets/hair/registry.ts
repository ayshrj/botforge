import {
  hairAfro,
  hairBluntBangs,
  hairBraidedPonytail,
  hairBun,
  hairBuzz,
  hairCurtain,
  hairHighPonytail,
  hairLongCurly,
  hairLongSidePart,
  hairLongStraight,
  hairLongWavy,
  hairLowPonytail,
  hairMediumCenterPart,
  hairMediumCurly,
  hairMediumSidePart,
  hairMediumStraight,
  hairMediumWavy,
  hairMohawkSoft,
  hairPompadour,
  hairShortBasic,
  hairShortMessy,
  hairShortSidePart,
  hairSlickedBack,
  hairSpikySoft,
  hairThickLocks,
  hairTopKnot,
  hairTwinBuns,
  hairUndercut,
} from "./assets";

import type { HairAsset, HairStyleId, HairStyleSelectionId } from "./types";

export interface HairAssetRegistry {
  get(id: HairStyleSelectionId): HairAsset | undefined;
  has(id: HairStyleId): boolean;
  getAll(): readonly HairAsset[];
}

export function createHairAssetRegistry(
  assets: readonly HairAsset[],
): HairAssetRegistry {
  const assetMap = new Map<HairStyleId, HairAsset>();

  for (const asset of assets) {
    if (!asset.back && !asset.front) {
      throw new Error(
        `Hair asset "${asset.id}" must define at least one of "back" or "front".`,
      );
    }

    if (assetMap.has(asset.id)) {
      throw new Error(`Duplicate hair asset ID: "${asset.id}".`);
    }

    assetMap.set(asset.id, asset);
  }

  return {
    get(id) {
      if (id === "hair-none") {
        return undefined;
      }

      return assetMap.get(id);
    },

    has(id) {
      return assetMap.has(id);
    },

    getAll() {
      return assets;
    },
  };
}

export const hairAssets = [
  // Batch 1 — short
  hairShortBasic,
  hairShortSidePart,
  hairShortMessy,
  hairBuzz,
  hairUndercut,
  hairSlickedBack,
  hairPompadour,
  hairSpikySoft,

  // Batch 2 — medium
  hairMediumStraight,
  hairMediumCenterPart,
  hairMediumSidePart,
  hairMediumWavy,
  hairMediumCurly,
  hairCurtain,
  hairBluntBangs,

  // Batch 3 — long / tied
  hairLongStraight,
  hairLongSidePart,
  hairLongWavy,
  hairLongCurly,
  hairHighPonytail,
  hairLowPonytail,
  hairBun,
  hairTopKnot,

  // Batch 4 — volume / tied / textured
  hairAfro,
  hairTwinBuns,
  hairBraidedPonytail,
  hairThickLocks,
  hairMohawkSoft,
] as const satisfies readonly HairAsset[];

export const hairAssetRegistry = createHairAssetRegistry(hairAssets);
