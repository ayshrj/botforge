import { AVATAR_DESIGN, getBeardCoveragePath, type BeardProfile } from "../../design-system";

/** Continuous coverage; the renderer masks this to the selected face's jaw. */
export function BeardCoverage({ color, profile }: { color: string; profile: BeardProfile }) {
  return <path d={getBeardCoveragePath(profile)} fill={color}
    fillOpacity={AVATAR_DESIGN.beardProfiles[profile].opacity}
    aria-hidden="true" pointerEvents="none" />;
}
