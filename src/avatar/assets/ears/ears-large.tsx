import type { EarAssetProps } from './types';
import { SideEarPair } from './side-ear-pair';

const OUTER = 'M5 -49C-24 -52 -45 -29 -47 5C-49 37 -30 58 -5 55C16 53 27 32 24 5C22 -23 18 -44 5 -49Z';
const INNER = 'M-7 -29C-24 -28 -33 -14 -33 6C-33 24 -23 36 -10 35C3 34 10 22 9 6C8 -13 3 -26 -7 -29Z';

export function EarsLarge(props: EarAssetProps) {
  return <SideEarPair {...props} outerPath={OUTER} innerPath={INNER} />;
}
