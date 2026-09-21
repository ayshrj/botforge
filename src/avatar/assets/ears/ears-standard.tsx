import type { EarAssetProps } from './types';
import { SideEarPair } from './side-ear-pair';

const OUTER = 'M4 -38C-18 -40 -34 -22 -36 4C-38 28 -24 44 -4 42C12 40 20 24 18 4C16 -16 14 -34 4 -38Z';
const INNER = 'M-5 -22C-18 -20 -24 -9 -24 6C-24 19 -17 27 -7 27C2 26 7 17 6 5C5 -8 2 -19 -5 -22Z';

export function EarsStandard(props: EarAssetProps) {
  return <SideEarPair {...props} outerPath={OUTER} innerPath={INNER} />;
}
