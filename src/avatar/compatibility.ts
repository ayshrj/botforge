import type { AvatarConfig } from "./types";
import { HEADWEAR_REGISTRY } from "./assets/headwear/registry";

export function getPresentation(config: Readonly<AvatarConfig>) {
  const headwear =
    config.headwear === "headwear-none"
      ? undefined
      : HEADWEAR_REGISTRY[config.headwear];

  return {
    cropUpperHair: headwear?.hairInteraction === "covers-upper-hair",
  };
}
