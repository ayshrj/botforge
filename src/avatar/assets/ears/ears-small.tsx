import type { EarAssetProps } from './types';
import { SideEarPair } from './side-ear-pair';

const OUTER = 'M3 -29C-14 -31 -27 -16 -28 4C-29 23 -18 35 -3 34C10 33 16 21 14 4C13 -12 11 -26 3 -29Z';
const INNER = 'M-4 -17C-13 -16 -18 -8 -18 4C-18 14 -13 21 -6 21C1 20 4 13 4 4C3 -6 1 -15 -4 -17Z';

export function EarsSmall(props: EarAssetProps) {
  return <SideEarPair {...props} outerPath={OUTER} innerPath={INNER} />;
}
