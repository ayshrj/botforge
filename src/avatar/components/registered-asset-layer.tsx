import type { AvatarAssetDefinition } from "../asset-registry";
import type { AvatarConfig } from "../types";
import { AvatarLayer, type AvatarHeadLayerId } from "./avatar-layer";

export interface RegisteredAssetLayerProps {
  layer: AvatarHeadLayerId;
  config: Readonly<AvatarConfig>;

  assets: readonly (AvatarAssetDefinition | undefined)[];
}

export function RegisteredAssetLayer({
  layer,
  config,
  assets,
}: RegisteredAssetLayerProps) {
  return (
    <AvatarLayer layer={layer}>
      {assets.map((asset) => {
        if (!asset) {
          return null;
        }

        const Component = asset.layers[layer];

        if (!Component) {
          return null;
        }

        return <Component key={`${asset.id}:${layer}`} config={config} />;
      })}
    </AvatarLayer>
  );
}
