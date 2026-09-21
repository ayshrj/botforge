import type { EarAssetDefinition, EarAssetId } from './types';
import { EarsStandard } from './ears-standard';
import { EarsSmall } from './ears-small';
import { EarsLarge } from './ears-large';
import { EarsPointed } from './ears-pointed';
import { EarsCat } from './ears-cat';
import { EarsBunny } from './ears-bunny';

export const EAR_ASSET_REGISTRY = {
  'ears-standard': { id: 'ears-standard', layer: 'ears', Component: EarsStandard },
  'ears-small': { id: 'ears-small', layer: 'ears', Component: EarsSmall },
  'ears-large': { id: 'ears-large', layer: 'ears', Component: EarsLarge },
  'ears-pointed': { id: 'ears-pointed', layer: 'ears', Component: EarsPointed },
  'ears-cat': { id: 'ears-cat', layer: 'ears', Component: EarsCat },
  'ears-bunny': { id: 'ears-bunny', layer: 'ears', Component: EarsBunny },
} satisfies Record<EarAssetId, EarAssetDefinition>;

export function getEarAsset(id: EarAssetId): EarAssetDefinition {
  return EAR_ASSET_REGISTRY[id];
}
