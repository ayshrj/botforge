import type { AccessoryAssetDefinition, AccessoryAssetId } from './types';
import { EarringStudLeft } from './earring-stud-left';
import { EarringStudRight } from './earring-stud-right';
import { EarringHoopLeft } from './earring-hoop-left';
import { EarringHoopRight } from './earring-hoop-right';
import { HairclipBasic } from './hairclip-basic';
import { HairBow } from './hair-bow';
import { AntennaBasic } from './antenna-basic';
import { MechanicalEarpiece } from './mechanical-earpiece';
import { SmallHorns } from './small-horns';
import { Halo } from './halo';

export const ACCESSORY_ASSET_REGISTRY = {
  'earring-stud-left': {
    id: 'earring-stud-left',
    layer: 'foreground-accessories',
    Component: EarringStudLeft,
  },
  'earring-stud-right': {
    id: 'earring-stud-right',
    layer: 'foreground-accessories',
    Component: EarringStudRight,
  },
  'earring-hoop-left': {
    id: 'earring-hoop-left',
    layer: 'foreground-accessories',
    Component: EarringHoopLeft,
  },
  'earring-hoop-right': {
    id: 'earring-hoop-right',
    layer: 'foreground-accessories',
    Component: EarringHoopRight,
  },
  'hairclip-basic': {
    id: 'hairclip-basic',
    layer: 'foreground-accessories',
    Component: HairclipBasic,
  },
  'hair-bow': {
    id: 'hair-bow',
    layer: 'foreground-accessories',
    Component: HairBow,
  },
  'antenna-basic': {
    id: 'antenna-basic',
    layer: 'headwear',
    Component: AntennaBasic,
  },
  'mechanical-earpiece': {
    id: 'mechanical-earpiece',
    layer: 'foreground-accessories',
    Component: MechanicalEarpiece,
  },
  'small-horns': {
    id: 'small-horns',
    layer: 'headwear',
    Component: SmallHorns,
  },
  halo: {
    id: 'halo',
    layer: 'headwear',
    Component: Halo,
  },
} satisfies Record<AccessoryAssetId, AccessoryAssetDefinition>;

export function getAccessoryAsset(id: AccessoryAssetId): AccessoryAssetDefinition {
  return ACCESSORY_ASSET_REGISTRY[id];
}
