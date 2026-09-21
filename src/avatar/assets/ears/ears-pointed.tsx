import type { EarAssetProps } from './types';
import { SideEarPair } from './side-ear-pair';

const OUTER = 'M8 -42L-50 -8C-42 22 -25 40 -3 41C14 41 22 25 20 4C18 -17 15 -35 8 -42Z';
const INNER = 'M-1 -26L-34 -7C-28 12 -18 24 -7 25C2 25 7 17 7 5C6 -8 4 -20 -1 -26Z';

export function EarsPointed(props: EarAssetProps) {
  return <SideEarPair {...props} outerPath={OUTER} innerPath={INNER} />;
}
