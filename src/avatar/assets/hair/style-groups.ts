import type { HairStyleId } from "./types";

export const HAIR_STYLE_GROUPS = ["All", "Short", "Flowing", "Curly", "Tied"] as const;
export type HairStyleGroup = (typeof HAIR_STYLE_GROUPS)[number];

export const hairStyleGroups = {
  "hair-short-basic": "Short",
  "hair-short-side-part": "Short",
  "hair-short-messy": "Short",
  "hair-buzz": "Short",
  "hair-undercut": "Short",
  "hair-slicked-back": "Short",
  "hair-pompadour": "Short",
  "hair-spiky-soft": "Short",
  "hair-medium-straight": "Flowing",
  "hair-medium-center-part": "Flowing",
  "hair-medium-side-part": "Flowing",
  "hair-medium-wavy": "Flowing",
  "hair-medium-curly": "Curly",
  "hair-curtain": "Flowing",
  "hair-blunt-bangs": "Flowing",
  "hair-long-straight": "Flowing",
  "hair-long-side-part": "Flowing",
  "hair-long-wavy": "Flowing",
  "hair-long-curly": "Curly",
  "hair-high-ponytail": "Tied",
  "hair-low-ponytail": "Tied",
  "hair-bun": "Tied",
  "hair-top-knot": "Tied",
  "hair-afro": "Curly",
  "hair-twin-buns": "Tied",
  "hair-braided-ponytail": "Tied",
  "hair-thick-locks": "Curly",
  "hair-mohawk-soft": "Short",
  "hair-wolf-cut": "Flowing",
  "hair-sculpted-bob": "Flowing",
  "hair-pixie-sweep": "Short",
} satisfies Record<HairStyleId, Exclude<HairStyleGroup, "All">>;
