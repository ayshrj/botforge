<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BotForge repository instructions

These rules apply repository-wide. Treat MUST and MUST NOT as requirements.

## Product contract

BotForge is a deterministic, vector-first modular avatar builder. `AvatarConfig` selects registered React/SVG assets, and `BotAvatar` composes them in a fixed layer order. SVG is an internal canonical artwork source; the visible editor preview and downloads are rasterized PNGs.

The runtime must remain local and deterministic. Do not add image generation, LLM calls, remote rendering, or a parallel Canvas/WebGL avatar renderer.

The application currently includes:

- a responsive live avatar editor on the main page;
- face-aware geometry and semantic anchors;
- five configurable head poses;
- registered faces, hair, glasses, facial hair, headwear, ears, and accessories;
- curated and custom colors for relevant features and the background;
- explicit `*-none` selections for optional asset families, including hair;
- undo/redo, reset, randomize, and JSON configuration copy;
- versioned browser-local persistence;
- PNG preview and 512/1024/2048 PNG downloads;
- desktop and mobile Playwright coverage.

Reset always means `DEFAULT_AVATAR_CONFIG`, even when the editor received `initialConfig`. `initialConfig` controls only the initial in-memory value and disables loading a saved browser value for that mount.

## Visual identity invariants

Every complete avatar must have exactly two equal dark vertical capsule eyes. Keep them readable across face shapes and assets. Do not add pupils, irises, sclera, highlights, eyelashes, eyebrows, a nose, or a mouth. Facial hair must not draw a mouth.

Keep the artwork flat, clean, stylized, and vector based. Avoid realistic anatomy, raster assets, textures, 3D rendering, or detailed strand work. Broad secondary color regions are acceptable when they strengthen a silhouette.

The canonical canvas is 512×512. The configured background is part of the exported avatar. Rich editor-only framing, shadows, motion, and ambience must stay outside the SVG.

The head is no longer required to use one fixed tilt. `headPose` is authoritative and supports:

```text
upright
tilt-left-soft
tilt-right-soft
tilt-left-strong
tilt-right-strong
```

All head-mounted layers inherit the one transform from `HeadRotationGroup`. Individual assets must not repeat a global pose rotation.

## File and naming conventions

Use lowercase kebab-case for all new non-route source filenames and directories. React component identifiers remain PascalCase. Asset IDs are stable lowercase kebab-case strings with their family prefix, for example `glasses-round` or `headwear-beanie`.

Keep one concept per file where practical. Do not create extensionless duplicates or alternate camelCase filenames. Route names follow Next.js conventions.

Use the exact asset-family ID unions from `src/avatar/assets/*/types.ts`. `src/avatar/asset-ids.ts` is the central re-export boundary. Do not weaken IDs to open template literals such as `` `hair-${string}` ``.

Optional selections use explicit stable IDs, never `null` or `undefined`:

```text
hair-none
glasses-none
facial-hair-none
headwear-none
accessory-none
```

## Configuration and defaults

`src/avatar/types.ts` owns `AvatarConfig`, `HeadPose`, and `DEFAULT_AVATAR_CONFIG`. The default constant is the only canonical default. Factories must return a shallow copy rather than recreate it field by field.

Current configuration fields are:

```text
headPose, background
faceShape, skinColor, blushColor
hairStyle, hairColor
glasses, glassesColor
facialHair, facialHairColor
headwear, headwearColor
ears
accessory, accessoryColor
```

When adding a persisted field:

1. update `AvatarConfig` and `DEFAULT_AVATAR_CONFIG`;
2. update the editor and renderer adapter;
3. update validation in `avatar-storage.ts`;
4. bump the storage schema when compatibility requires it;
5. add a migration rather than silently discarding a previously valid saved avatar;
6. update tests and this document.

Colors accepted by persistence are six-digit hex values. Keep IDs stable once persisted; rename them only with an alias or migration.

## Geometry architecture

`src/avatar/design-system.ts` is the sole geometry authority. It owns:

- the canvas and pose pivot/angles;
- face source bounds and target proportions;
- `fitBounds()`;
- `getHeadTransform()`;
- `getFaceGeometry()`;
- semantic face/eye/ear/cheek/chin/head/accessory anchors;
- family transforms for hair, facial hair, headwear, and glasses;
- ear-dependent accessory anchor adjustment.

There is no second `anchors`/`featureAnchors` system. Do not introduce one. Before changing a coordinate, inspect every consumer and verify representative combinations visually.

Face assets keep their authored local path coordinates. `getFaceGeometry(faceShape)` fits those paths into the canonical target and derives all dependent anchors from the selected face. Narrow and wide faces must alter eye spacing, ears, glasses, beard width, cheeks, hair, and headwear coherently.

Prefer local asset coordinates followed by one shared family transform. Do not repair alignment with scattered per-component global offsets or application CSS. Application CSS owns the editor; SVG geometry owns avatar placement.

Earrings and ear devices use ear/lobe anchors. Hair clips and bows use hairline/temple anchors. Halos, horns, and antennae use head-top anchors. Glasses use the face-aware eye/face bounds. Headphones use ear anchors.

Facial hair is scaled into the lower-face envelope and clipped in face space. If modifying face or beard geometry, verify none, moustache, short, medium, full, and combination assets on all face widths.

## Rendering and registries

`src/avatar/renderer-registry.tsx` is the canonical adapter from domain registries to renderable layered assets. `src/avatar/editor/avatar-editor-adapter.ts` only re-exports the canonical renderer/catalog for the client editor.

The canonical head layer order is defined in `src/avatar/components/avatar-layer.tsx`:

```text
hair-back
ears
neck-collar
face
blush
eyes
facial-hair
hair-front
glasses
headwear
foreground-accessories
```

The background renders before the shared head group. Change layer order only with visual QA across assets that depend on front/back composition.

Every registry entry must have a unique stable ID and a valid component. Add asset IDs to the exact family union/constant, register the component, expose it through editor options, and test that the default and randomizer can resolve it.

Headwear compatibility is declarative through `hairInteraction`; `getPresentation()` converts this metadata into renderer behavior. Prefer graceful adaptation to hiding an asset. Add compatibility rules only for real visual conflicts.

## Editor state and browser behavior

`AvatarCustomizer` owns editor state and history; `BotAvatar` remains a pure renderer. Do not move persistence, randomization, downloads, or toasts into the renderer.

History is bounded and supports Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z. New editor actions that mutate config should go through the same commit path so they remain undoable and call `onConfigChange` consistently.

Persistence is localStorage schema version 1 at `botforge.avatar.v1`. All restored data must pass `parseAvatarConfig()` before rendering. Invalid data falls back safely to the canonical default.

The visible preview is a PNG rasterization of the canonical SVG. The SVG used for rasterization may exist only in an offscreen editor container; do not add a visible SVG or SVG download action. PNG downloads rasterize that same source at the requested square size. Never hand-maintain a second export tree or geometry set.

Editor animation must be optional decoration. Respect `prefers-reduced-motion`. Keep touch targets comfortable, tabs keyboard navigable, focus visible, selection semantic (`aria-selected`/`aria-pressed`), and toast feedback in a polite live region.

## Styling and performance

Use Tailwind utilities and the small shared rules in `src/app/globals.css`. Maintain the warm ivory/plum/lilac product direction unless a request explicitly changes it. Do not fall back to a generic dashboard aesthetic or mix unrelated icon systems.

Mini previews intentionally use the full canonical renderer so options are truthful. Be mindful of catalog size and avoid unrelated state changes that remount every preview. Memoize only after measuring a real issue.

Mobile is a first-class layout, not a squeezed desktop view. Verify horizontal category scrolling, two-column option cards, preview scale, action wrapping, and custom color controls around 390px width.

## Required checks

Run the real repository commands after relevant changes:

```bash
npm exec tsc -- --noEmit
npm run lint
npm test
npm run build
```

`npm test` uses Playwright with installed system Chrome and covers desktop and mobile. Browser tests bind a local Next.js server and may require sandbox permission. Do not invent format or test commands beyond those declared in `package.json`.

For renderer changes, additionally inspect difficult combinations across:

- round, oval, wide, narrow, and soft-square faces;
- all five poses;
- short, long, curly, and no hair;
- none, moustache, and full beard;
- regular glasses and sunglasses;
- no headwear, beanie/cap, and headphones;
- earrings, head-top accessories, and ear devices;
- 32–128px output when small-size readability is relevant.

Compare the live PNG preview and downloaded PNG after export-related changes.

## Change discipline

Inspect the current implementation before editing; older plans are not source of truth. Preserve unrelated user changes in a dirty worktree. Remove dead geometry, abandoned adapters, temporary screenshots, debug logging, and generated Playwright artifacts before finishing.

Update this file when geometry ownership, config schema, persistence, registry contracts, layer order, scripts, or folder conventions change. Keep `README.md` focused on setup and user-facing capabilities rather than duplicating this internal contract.
