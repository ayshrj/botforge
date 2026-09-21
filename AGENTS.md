<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BotForge Repository Instructions

This is the root instruction file for coding agents and human contributors working on BotForge.

These instructions apply repository-wide unless a future nested `AGENTS.md` provides additional scoped instructions for a specific subsystem.

Treat MUST, MUST NOT, SHOULD, and SHOULD NOT as engineering requirements, not suggestions.

---

# 1. Repository Overview

## What BotForge is

BotForge is a manual modular SVG avatar builder.

A user creates a stylized bot/person/character avatar by choosing deterministic visual features such as:

- face shape
- skin color
- hairstyle
- hair color
- glasses
- facial hair
- headwear
- ears
- accessories

The final avatar is assembled from reusable React-rendered SVG layers.

BotForge is intentionally not a generative-image application. AI may assist development or eventually suggest avatar settings, but the core runtime renderer must remain deterministic.

The core model is:

```text
AvatarConfig
    ↓
registered asset lookup
    ↓
ordered SVG layer composition
    ↓
BotAvatar
    ↓
browser SVG
```

SVG is the canonical visual representation.

PNG, when implemented, must be derived from that SVG rather than maintained as a second rendering system.

## Product philosophy

BotForge SHOULD remain:

- deterministic
- manually configurable
- data-driven
- vector-first
- easy to extend with modular assets
- independent of AI at runtime
- independent of remote image-generation services
- visually consistent across all asset combinations

Adding an avatar feature should normally mean adding an asset and registry entry, not adding a new rendering engine.

## Current implemented functionality

The repository currently implements:

- Next.js application shell
- responsive avatar editor
- live SVG avatar preview
- face selection
- skin color selection
- hairstyle selection
- hair color selection
- glasses selection
- facial-hair selection
- headwear selection
- ear selection
- accessory selection
- preset skin-color swatches
- preset hair-color swatches
- custom browser color inputs for skin and hair
- canonical `AvatarConfig`
- canonical default avatar config
- deterministic SVG rendering
- ordered SVG layer composition
- typed asset-family registries
- front/back hairstyle layers
- multiple face assets
- multiple hairstyle assets
- multiple glasses assets
- multiple facial-hair assets
- multiple headwear assets
- multiple ear assets
- multiple accessory assets
- an editor Reset button

The current application entry point renders `AvatarCustomizer` from `src/app/page.tsx`.

## Not currently implemented

Do not describe these as existing features:

- localStorage persistence
- configuration import
- configuration JSON copy/export
- persistence schema migration
- randomization
- compatibility-rule enforcement
- SVG file export
- PNG export
- shareable URLs
- backend accounts
- cloud saves
- automated test suite
- visual-regression suite
- formatting script/tool
- backend APIs
- runtime AI
- photo-based automatic configuration

Some of these are approved future directions, but they do not currently exist in the checked-in source.

---

# 2. Core Product Invariants

These rules are non-negotiable unless a current explicit product request changes them.

## Face and eyes

Every completed BotForge avatar MUST have:

- exactly two eyes
- solid near-black eyes
- vertically oriented capsule eyes
- equal-sized eyes
- parallel eyes
- rounded eye ends
- no pupils
- no irises
- no sclera
- no eye highlights
- no reflections
- no eyelashes
- no eyelids
- no eyebrows
- no nose
- no mouth

Do not add facial anatomy merely because a conventional avatar library would normally include it.

Facial hair MUST NOT create, outline, reveal, or strongly imply a mouth.

Both eyes MUST remain visibly readable through every hairstyle, pair of glasses, headwear item, and accessory.

## Face silhouette

The face MUST remain:

- large
- rounded
- stylized
- smooth
- bot-like rather than anatomically realistic

Avoid detailed anatomy, realistic cheek contours, nostrils, lips, skin texture, or other realism.

## Composition

The established composition is:

- square 512×512 coordinate space
- dark near-black charcoal background
- extreme-close-up head
- head visually entering primarily from the lower-left
- approximately 17° clockwise head rotation
- natural cropping at the left and lower canvas edges is allowed
- upper-right negative space is intentionally preserved

A refactor MUST NOT casually re-center the head, remove the tilt, or fill the upper-right area.

## Rendering style

Avatar artwork MUST remain:

- flat
- minimalist
- 2D
- vector-based
- composed primarily from filled SVG geometry
- free from photorealistic shading
- free from textures
- free from 3D rendering
- free from unnecessary outlines
- free from gradients unless explicitly approved
- free from text and logos

Use SVG rather than raster assets whenever the feature can reasonably be represented as vector geometry.

## Rendering source of truth

SVG MUST remain the canonical renderer.

Do not create separate HTML/CSS, Canvas, WebGL, PNG, or AI rendering logic that can drift visually from `BotAvatar`.

Refactors MUST preserve these visual invariants even if internal architecture changes.

---

# 3. Tech Stack

The actual repository currently uses the following stack.

| Technology                    | Current role                                               |
| ----------------------------- | ---------------------------------------------------------- |
| Next.js `16.3.5`              | Application framework, App Router, dev/build/start tooling |
| React `19.2.8`                | UI and SVG component rendering                             |
| React DOM `19.2.8`            | Browser React runtime                                      |
| TypeScript `^5`               | Static typing                                              |
| Tailwind CSS `^4`             | Application/editor styling                                 |
| `@tailwindcss/postcss` `^4`   | Tailwind PostCSS integration                               |
| ESLint `^9`                   | Static linting                                             |
| `eslint-config-next` `16.3.5` | Next.js/React lint rules                                   |
| npm                           | Package manager; `package-lock.json` is committed          |
| Next webpack build            | `npm run build` invokes `next build --webpack`             |

The repository does **not** currently use Vite.

Older planning references to React + Vite are superseded by the actual Next.js implementation.

## TypeScript configuration

`tsconfig.json` currently enables:

- `strict: true`
- `noEmit: true`
- `moduleResolution: "bundler"`
- React JSX
- Next.js TypeScript plugin
- `@/*` → `./src/*` path alias

`allowJs` is enabled by the generated configuration, but application source is currently TypeScript/TSX.

## Testing

There is currently no test framework configured and no `test` package script.

Do not claim tests passed unless a test framework/script is actually added and run.

## Formatting

There is currently no Prettier dependency and no `format` package script.

Do not invent one.

Preserve nearby file style and avoid formatting-only churn.

---

# 4. Repository Structure

Current important structure:

```text
/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    └── avatar/
        ├── asset-ids.ts
        ├── asset-registry.ts
        ├── bot-avatar.tsx
        ├── design-system.ts
        ├── index.ts
        ├── types.ts
        ├── components/
        │   ├── avatar-layer.tsx
        │   ├── core-layers.tsx
        │   ├── head-rotation-group.tsx
        │   └── registered-asset-layer.tsx
        ├── editor/
        │   ├── asset-selector.tsx
        │   ├── avatar-customizer.tsx
        │   ├── avatar-editor-adapter.ts
        │   ├── category-nav.tsx
        │   ├── color-swatch-picker.tsx
        │   ├── editor-options.ts
        │   └── index.ts
        └── assets/
            ├── accessories/
            ├── ears/
            ├── faces/
            ├── facial-hair/
            ├── glasses/
            ├── hair/
            └── headwear/
```

## `src/app`

Next.js App Router application shell.

### `src/app/page.tsx`

Current homepage.

Renders the BotForge title and `AvatarCustomizer`.

Do not put avatar rendering logic directly in this route.

### `src/app/layout.tsx`

Root Next.js layout and page metadata.

### `src/app/globals.css`

Loads Tailwind CSS and global theme/font defaults.

Avatar drawing geometry does not belong here.

## `src/avatar`

Canonical avatar engine.

### `src/avatar/types.ts`

Owns:

- `AvatarConfig`
- `DEFAULT_AVATAR_CONFIG`

This is the canonical avatar configuration contract.

### `src/avatar/asset-ids.ts`

Central re-export layer for asset-family ID types/constants.

The actual concrete ID definitions live beside each asset family.

### `src/avatar/design-system.ts`

Canonical shared geometry and fixed rendering constants.

This file is the first place to inspect before modifying:

- canvas geometry
- rotation
- eye geometry
- blush geometry
- shared feature anchors
- design bounds
- negative-space constraints
- fixed core colors

Do not recreate these shared values elsewhere.

### `src/avatar/bot-avatar.tsx`

Canonical complete avatar SVG renderer.

Responsibilities:

- creates the root SVG
- renders the background
- selects configured generic assets
- applies the global head rotation
- renders layers in canonical order
- invokes core face/blush/eye layers
- invokes registered feature layers

Do not duplicate this composition logic inside the editor.

### `src/avatar/asset-registry.ts`

Generic renderer-facing registry contract.

This differs from individual family registries.

It maps selected categories to one or more canonical render layers.

### `src/avatar/components/avatar-layer.tsx`

Defines canonical layer IDs and layer ordering.

### `src/avatar/components/core-layers.tsx`

Renders:

- background
- selected face
- blush
- two canonical eyes

Eyes belong here, not inside assets.

### `src/avatar/components/head-rotation-group.tsx`

Owns the global head rotation transform.

Individual assets MUST NOT apply the global 17° rotation themselves.

### `src/avatar/components/registered-asset-layer.tsx`

Renders asset components attached to a requested generic layer.

## `src/avatar/assets`

Contains asset-family implementations.

Each family owns its own nearby:

- asset components
- `types.ts`
- `registry.ts`
- `index.ts`

Do not create a separate global `registries/` directory unless the architecture is intentionally changed.

## `src/avatar/editor`

Editor-specific UI and adapter code.

### `avatar-customizer.tsx`

Current owner of live `AvatarConfig` state.

### `avatar-editor-adapter.ts`

Bridges family-specific registries/components into the generic `AvatarAssetRegistry` consumed by `BotAvatar`.

This adapter is important architectural glue.

### `editor-options.ts`

Defines:

- editor categories
- skin swatches
- hair swatches
- registry-derived selector options
- default-config factory

### `asset-selector.tsx`

Generic asset-selection buttons.

Optional selections use explicit `"*-none"` IDs rather than `null`.

### `color-swatch-picker.tsx`

Preset swatches plus optional native custom color input.

### `category-nav.tsx`

Accessible tab-style category navigation.

---

# 5. Architecture

The current rendering path is:

```text
AvatarCustomizer
    │
    ├── owns AvatarConfig state
    │
    └── passes config
            ↓
avatarEditorAssetRegistry
            │
            │ translates family registries/components
            │ into generic render-layer definitions
            ↓
BotAvatar
    │
    ├── background
    └── HeadRotationGroup
            ↓
      canonical layer order
            ↓
      face / blush / eyes
      +
      selected registered assets
            ↓
        final SVG
```

## Canonical state

`AvatarConfig` is the canonical representation of the selected avatar.

The rendered SVG is derived state.

Never edit the rendered DOM to represent avatar state.

## Face rendering

Faces currently use a slightly different path from the other configurable families.

`FaceLayer` calls `getFaceAsset(config.faceShape)` directly.

Faces are therefore not currently passed through `AvatarAssetRegistry`.

Do not assume every category uses exactly the same registry plumbing when refactoring.

## Other asset families

The editor imports family-specific registries and converts them to `AvatarAssetRegistry` inside:

```text
src/avatar/editor/avatar-editor-adapter.ts
```

This adapter handles:

- hairstyle front/back layer conversion
- glasses anchors/frame color
- facial-hair color
- headwear color
- ear skin color
- accessory layer/color

## Determinism

Rendering is deterministic because the output depends only on:

- `AvatarConfig`
- fixed geometry
- registered components
- fixed rendering order

There is no randomness in `BotAvatar`.

There is no network request in the renderer.

There is no AI call in the renderer.

There is no runtime asset generation.

The same supported `AvatarConfig` should produce the same visual composition.

---

# 6. AvatarConfig Contract

Canonical definition:

```text
src/avatar/types.ts
```

Current structure:

```ts
interface AvatarConfig {
  faceShape: FaceShapeId;
  skinColor: string;

  hairStyle: HairStyleSelectionId;
  hairColor: string;

  glasses: GlassesSelectionId;
  facialHair: FacialHairSelectionId;
  headwear: HeadwearSelectionId;
  ears: EarAssetId;
  accessory: AccessorySelectionId;

  blushColor: string;
}
```

All fields are currently required.

## Field contract

| Field        | Type                    | Purpose                                     | None allowed?                   | Current default    | Asset source         |
| ------------ | ----------------------- | ------------------------------------------- | ------------------------------- | ------------------ | -------------------- |
| `faceShape`  | `FaceShapeId`           | Face silhouette                             | No                              | `face-round`       | face registry        |
| `skinColor`  | `string`                | Face and ear color                          | No                              | `#D99B73`          | direct color         |
| `hairStyle`  | `HairStyleSelectionId`  | Hairstyle                                   | `"hair-none"` permitted by type | `hair-short-basic` | hair registry        |
| `hairColor`  | `string`                | Hair and currently several related features | No                              | `#29292E`          | direct color         |
| `glasses`    | `GlassesSelectionId`    | Glasses                                     | `"glasses-none"`                | `glasses-none`     | glasses registry     |
| `facialHair` | `FacialHairSelectionId` | Beard/moustache                             | `"facial-hair-none"`            | `facial-hair-none` | facial-hair registry |
| `headwear`   | `HeadwearSelectionId`   | Hat/headwear                                | `"headwear-none"`               | `headwear-none`    | headwear registry    |
| `ears`       | `EarAssetId`            | Ear style                                   | No                              | `ears-standard`    | ear registry         |
| `accessory`  | `AccessorySelectionId`  | Optional accessory                          | `"accessory-none"`              | `accessory-none`   | accessory registry   |
| `blushColor` | `string`                | Cheek blush                                 | No                              | `#D98787`          | direct color         |

## Null policy

Current `AvatarConfig` does not use `null` for selections.

Optional feature absence is represented by stable sentinel IDs:

```text
hair-none
glasses-none
facial-hair-none
headwear-none
accessory-none
```

Do not convert these back to `null` without an intentional schema change.

Do not persist JSX, component functions, registry entries, or imported modules in `AvatarConfig`.

Persist only serializable configuration values.

## Current Hair UI discrepancy

`HairStyleSelectionId` allows `"hair-none"`.

The current Hair editor does not expose a `"hair-none"` option.

Do not accidentally remove `"hair-none"` from the type merely because the current UI omits it. Resolve the product behavior intentionally when touching this area.

## Default config

There is one canonical constant:

```text
DEFAULT_AVATAR_CONFIG
```

in:

```text
src/avatar/types.ts
```

`createDefaultAvatarConfig()` returns a shallow copy of this constant.

Do not create another independently-maintained set of default values.

## Future schema changes

Once configurations are persisted or shared, changes to `AvatarConfig` become migration-sensitive.

When changing fields later:

1. define the new schema
2. keep old persisted versions parseable
3. migrate old fields explicitly
4. validate asset IDs
5. substitute safe defaults when assets no longer exist
6. preserve as much user intent as possible
7. only then write the new version

Never silently discard an entire saved avatar because one optional asset was removed.

---

# 7. SVG Coordinate System

## Canonical source

The canonical geometry source is:

```text
src/avatar/design-system.ts
```

Use `AVATAR_DESIGN`.

Do not add another global avatar geometry file.

Do not resurrect `src/constants/avatar.ts`, the old feature-anchor module, or the old headwear-geometry module as competing sources.

## Canvas

The canonical canvas is:

```text
512 × 512
viewBox="0 0 512 512"
```

Only `BotAvatar` should normally own the root `<svg>` and its `viewBox`.

Individual React asset components render geometry in this shared coordinate space.

They do not need their own nested `<svg viewBox>`.

## Head rotation

The renderer applies:

```text
17° clockwise
```

around the pivot defined by:

```ts
AVATAR_DESIGN.head.pivot;
```

Current reference value:

```text
(227, 317)
```

There is currently no separate canonical `headCenter` property.

Do not invent a second head center simply because older planning documents mention one.

The operational transform source is the pivot in `AVATAR_DESIGN.head`.

## Face

`AVATAR_DESIGN.face` currently provides reference face bounds used by shared geometry consumers such as glasses layout.

Current reference values are approximately:

```text
x: 34
y: 112
width: 386
height: 410
corner radius: 160
```

Important: actual selectable face silhouettes are SVG paths in:

```text
src/avatar/assets/faces/
```

`FaceLayer` renders the selected face asset.

Therefore, changing `AVATAR_DESIGN.face` alone does not redraw all face paths.

When changing face geometry, inspect both:

- shared reference bounds
- every affected face asset

## Eyes

Canonical eye geometry is `AVATAR_DESIGN.eyes`.

Current eye reference:

```text
size: 32 × 86
left center:  (166, 281)
right center: (278, 281)
corner radius: 16
```

These dimensions produce the required vertical capsule shape.

The eye locations and dimensions are core product geometry.

Do not duplicate these numbers inside glasses or other assets.

The editor adapter currently derives glasses eye anchors directly from `AVATAR_DESIGN.eyes`.

## Blush

Canonical blush geometry is `AVATAR_DESIGN.blush`.

Current reference:

```text
ellipse radii: 34 × 13
left center:  (123, 376)
right center: (329, 376)
```

## Shared anchors

`AVATAR_DESIGN` currently contains both:

```text
anchors
featureAnchors
```

These are not interchangeable merely because their names overlap.

Current asset implementations such as ears and accessories use `featureAnchors`.

For example, ear components currently attach through:

```ts
AVATAR_DESIGN.featureAnchors.ears;
```

Do not blindly replace these coordinates with `AVATAR_DESIGN.anchors.ears`.

Before deleting, renaming, or consolidating anchor groups, inspect all usages and visually compare affected assets.

## Ear anchors

Actual current ear asset attachment uses:

```text
AVATAR_DESIGN.featureAnchors.ears
```

The outer ear shapes are defined relative to those anchor translations.

Ear geometry must stay compatible with:

- face edges
- earrings
- hair
- headwear
- the outer rotation

## Glasses anchors

The editor adapter derives glasses anchors from:

```text
AVATAR_DESIGN.eyes
AVATAR_DESIGN.face
```

Glasses assets then use `createGlassesLayout()`.

Do not hard-code eye coordinates inside new glasses components.

## Headwear

`AVATAR_DESIGN` contains:

- a general headwear anchor
- headwear bounds
- `headwearGeometry` design-envelope values

Current headwear asset path geometry is still authored directly in canonical 512-space.

`headwearGeometry` is not a replacement for the paths themselves; it expresses shared limits/reference zones.

Headwear MUST preserve the eye corridor.

Current design includes an `eyeSafeTop` reference in `AVATAR_DESIGN.headwearGeometry`.

## Hair-safe region

The canonical hair envelope is:

```ts
AVATAR_DESIGN.bounds.hair;
```

Current reference values:

```text
x: 20
y: 62
width: 430
height: 275
```

Hair may extend outside this reference when the hairstyle intentionally has ponytails, long back sections, buns, etc., but such extension must be deliberate.

## Glasses bounds

Use:

```ts
AVATAR_DESIGN.bounds.glasses;
```

as the general visual envelope.

Actual glasses fitting should use the dynamic eye anchors passed to the glasses component.

## Headwear bounds

Use:

```ts
AVATAR_DESIGN.bounds.headwear;
```

as the shared headwear reference envelope.

## Accessory anchors

Accessory placement anchors currently live under:

```ts
AVATAR_DESIGN.featureAnchors;
```

Available concepts include:

- earrings
- head top
- hair accessory
- earpiece
- antenna
- halo

Do not invent a separate coordinate system for new accessories.

If a reusable attachment point is missing, add it to the canonical design system rather than copying the same literal coordinates into several assets.

## Upper-right negative space

The canonical protected region is:

```ts
AVATAR_DESIGN.safeZones.upperRightNegativeSpace;
```

Current reference:

```text
x: 365
y: 0
width: 147
height: 132
```

Do not casually allow large hair/headwear/accessory geometry to fill this entire region.

The negative space is part of the composition, not unused room waiting to be filled.

## Cropping

Natural off-canvas cropping is intentional.

Assets may extend beyond the canvas on the left and lower edges where the close-up composition calls for it.

Do not enlarge the `viewBox` just to reveal an asset that is intentionally cropped.

There is no separate canonical raster crop.

The 512×512 SVG viewport is the crop.

## Magic-number rule

**DO NOT introduce independent shared geometry magic numbers into assets when the value belongs in `AVATAR_DESIGN`.**

Asset-specific Bézier/path coordinates are expected.

Cross-asset anchors, eye positions, canvas dimensions, shared attachment locations, safe zones, and global transforms are not asset-specific and belong in the design system.

---

# 8. SVG Layer Order

Canonical order is defined in:

```text
src/avatar/components/avatar-layer.tsx
```

Current order:

1. `background`
2. `hair-back`
3. `ears`
4. `neck-collar`
5. `face`
6. `blush`
7. `eyes`
8. `facial-hair`
9. `hair-front`
10. `glasses`
11. `headwear`
12. `foreground-accessories`

This order matters.

Examples:

- long hair can sit behind the face using `hair-back`
- bangs can sit in front using `hair-front`
- ears sit behind the face
- eyes sit above blush
- facial hair sits above the face but below front hair
- glasses sit above eyes and front hair
- headwear sits above hair
- foreground accessories sit last

## Rotation boundary

`background` is rendered outside `HeadRotationGroup`.

Every other canonical head layer is currently rendered inside the rotated group.

Assets MUST NOT independently repeat the global 17° transform.

## Hair front/back

One logical hairstyle may provide:

- only `back`
- only `front`
- both

This is represented by `HairAsset`.

Do not create separate user-facing selections for front and back halves of the same hairstyle.

## Reserved neck/collar layer

`neck-collar` exists in the layer model but currently has no built-in editor category/asset family.

It is available for future features where that ordering is correct.

## Changing layer order

Changing layer order can alter every avatar combination.

Treat it as an architecture/visual-system change, not a local cosmetic edit.

When a new feature needs a different relative depth, first determine whether an existing layer is appropriate.

Only add a new layer when the feature cannot be represented correctly with the current ordering.

---

# 9. SVG Asset Contract

A valid BotForge avatar asset MUST satisfy all of the following.

## Coordinate space

Asset geometry is authored in the shared:

```text
0 0 512 512
```

coordinate system.

Because assets are React layer components inside the canonical SVG, they normally MUST NOT create a separate root `<svg>`.

## Responsibility isolation

An asset contains only its own feature.

Examples:

- hair MUST NOT contain face geometry
- glasses MUST NOT contain eyes
- glasses MUST NOT contain a face
- beard MUST NOT contain a mouth
- headwear MUST NOT duplicate a hairstyle
- ears MUST NOT contain earrings unless intentionally designed as a combined product feature
- an accessory MUST NOT redraw unrelated core features

## Background

Assets MUST have transparent backgrounds.

Only the renderer's background layer owns the canvas background.

## Disallowed asset content

Avatar assets MUST NOT contain:

- embedded raster images
- base64 images
- external image URLs
- external resources
- external stylesheets
- text
- logos
- photorealistic textures
- unnecessary gradients
- filter-heavy realism

## Preferred primitives

Prefer:

- `<path>`
- `<rect>`
- `<ellipse>`
- `<circle>`
- `<g>`

Use strokes sparingly.

Filled shapes are usually preferred for the BotForge style.

## Paths

Prefer:

- smooth curves
- broad masses
- few paths
- simple silhouettes
- readable shapes at small sizes

Avoid tracing artwork into hundreds of nodes.

Do not model hair with individual strands.

## Eye visibility

Every new asset must be checked against the canonical eye positions.

Neither eye may be fully covered.

For glasses, frames and tint must leave the two capsule eyes readable.

Current sunglasses use translucent flat lens fills rather than opaque eye coverage.

## Recoloring

Use `currentColor` when a feature has one primary recolorable visual color and the family convention supports it.

Hair commonly uses:

```tsx
<g color={hairColor}>
  <path fill="currentColor" ... />
</g>
```

Use explicit semantic props when a component supports multiple colors.

Examples:

- `skinColor`
- `frameColor`
- `primaryColor`
- `secondaryColor`
- `accentColor`
- `color`

Do not create separate SVG/component files solely for different colors.

## Rotation

Asset geometry is authored unrotated.

The renderer rotates the complete head group.

Do not rotate an asset by 17° to “make it line up.”

---

# 10. Asset Naming Standard

Stable asset IDs use lowercase kebab-case.

Examples:

```text
hair-short-side-part
hair-medium-curly
glasses-round
beard-short
headwear-beanie
ears-pointed
earring-hoop-left
```

## Files

Use lowercase kebab-case.

Examples:

```text
hair-short-side-part.tsx
glasses-round.tsx
beard-short.tsx
headwear-beanie.tsx
```

All new non-route source filenames and directories should use kebab-case.

Preserve required Next.js special names such as:

```text
page.tsx
layout.tsx
```

## React components

Use PascalCase.

Examples:

```text
HairShortSidePartFront
HairLongStraightBack
GlassesRound
BeardShort
HeadwearBeanie
EarsPointed
EarringHoopLeft
```

## Asset descriptor constants

Follow the existing family convention.

Hair descriptors currently use camelCase:

```text
hairShortSidePart
hairLongStraight
```

Do not rename an entire family merely to standardize casing during unrelated work.

## Human-readable labels

Use concise Title Case labels.

Examples:

```text
Round
Short Beard
Baseball Cap
Round Sunglasses
```

Not every current family stores labels in its registry.

The editor currently uses `humanizeAssetId()` for its selection buttons.

Do not create a second hard-coded UI option list just to provide labels.

## Stable-ID warning

Asset IDs are intended to become persisted/shareable identifiers.

Renaming an asset ID is therefore potentially breaking even before persistence lands.

Once persistence or URL sharing exists, renaming an ID MUST include a migration/alias strategy.

---

# 11. Registry Architecture

BotForge currently has two registry levels.

## Family registries

Each asset family owns its own domain-specific registry and type contract.

Examples:

```text
src/avatar/assets/faces/registry.ts
src/avatar/assets/hair/registry.ts
src/avatar/assets/glasses/registry.ts
src/avatar/assets/facial-hair/registry.ts
src/avatar/assets/headwear/registry.ts
src/avatar/assets/ears/registry.ts
src/avatar/assets/accessories/registry.ts
```

These registries are statically imported.

Do not discover avatar assets by arbitrary runtime file paths.

## Renderer registry

`src/avatar/asset-registry.ts` defines `AvatarAssetRegistry`.

Its entries are normalized into:

```ts
interface AvatarAssetDefinition<Id extends string = string> {
  readonly id: Id;
  readonly layers: Partial<Record<AvatarHeadLayerId, AvatarAssetComponent>>;
}
```

The editor converts family registries into this form using:

```text
src/avatar/editor/avatar-editor-adapter.ts
```

## Current family registry shapes

### Faces

```ts
{
  (id, Component);
}
```

Faces are rendered directly by `FaceLayer`.

### Hair

```ts
{
  id,
  back?,
  front?
}
```

`createHairAssetRegistry()` validates:

- no duplicate IDs
- at least one front/back layer exists

### Glasses

```ts
{
  (id, label, Component, tinted);
}
```

### Facial hair

```ts
{
  (id, label, kind, Component);
}
```

### Headwear

```ts
{
  (id, label, Component, hairInteraction);
}
```

`hairInteraction` is currently descriptive metadata.

It is not currently a compatibility engine.

### Ears

```ts
{
  id,
  layer: "ears",
  Component
}
```

### Accessories

```ts
{
  (id, layer, Component);
}
```

Current accessory layer choices are:

```text
headwear
foreground-accessories
```

## Adding an asset safely

For any asset:

1. inspect the family's `types.ts`
2. inspect a visually similar existing asset
3. create the new component in that family
4. follow `AVATAR_DESIGN`
5. add its stable ID to the family's exact ID union/constant
6. export the component/descriptor as required
7. register it in the family registry
8. ensure the editor derives the new option rather than hard-coding it
9. run TypeScript
10. run lint
11. run build
12. visually inspect default and relevant combinations
13. verify eye visibility
14. verify the 512×512 crop
15. once export exists, verify SVG/PNG export
16. once persistence exists, verify import/restore behavior

Do not bypass a family registry by inserting a component directly into an editor option list.

---

# 12. Adding a New Hairstyle

Hair is the best example of BotForge's multi-layer architecture.

## Step 1: choose an ID

Use:

```text
hair-<descriptive-name>
```

Example:

```text
hair-short-textured
```

Add it to:

```text
src/avatar/assets/hair/types.ts
```

specifically `HAIR_STYLE_IDS`.

## Step 2: determine required layers

Ask:

- Does any hair need to appear behind the face?
- Does any hair need to appear over the forehead/front face?

Use:

- `back` for rear mass, ponytails, long rear hair, etc.
- `front` for bangs/top/front silhouette
- both when needed

Do not split one hairstyle into separate user selections.

## Step 3: create the file

Place it under:

```text
src/avatar/assets/hair/assets/
```

Example:

```text
src/avatar/assets/hair/assets/hair-short-textured.tsx
```

Follow existing components such as:

```text
hair-short-side-part.tsx
hair-long-straight.tsx
```

## Step 4: use the family props

Use `HairLayerProps`.

Primary hair fill should normally be driven by `hairColor`.

The common pattern is:

```tsx
function HairExampleFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path fill="currentColor" d="..." />
    </g>
  );
}
```

## Step 5: define one HairAsset

Example shape:

```ts
export const hairExample = {
  id: "hair-example",
  front: HairExampleFront,
} satisfies HairAsset;
```

or:

```ts
export const hairExample = {
  id: "hair-example",
  back: HairExampleBack,
  front: HairExampleFront,
} satisfies HairAsset;
```

## Step 6: export it

Update:

```text
src/avatar/assets/hair/assets/index.ts
```

## Step 7: register it

Import the descriptor in:

```text
src/avatar/assets/hair/registry.ts
```

and add it to `hairAssets`.

The order of `hairAssets` currently influences editor option order.

## Step 8: validate geometry

Check against:

```ts
AVATAR_DESIGN.eyes;
AVATAR_DESIGN.bounds.hair;
AVATAR_DESIGN.safeZones.upperRightNegativeSpace;
```

Hair MUST NOT fully cover either eye.

Do not add the global rotation to the hairstyle.

## Step 9: verify

Run:

```bash
npm exec tsc -- --noEmit
npm run lint
npm run build
```

Then inspect in the live editor with:

- multiple face shapes
- multiple skin colors
- dark hair
- light hair
- glasses
- headwear where relevant

When export exists, verify exported SVG/PNG as well.

---

# 13. Adding a New Category

Adding a category is an architectural change, not just another asset.

Examples:

- scarves
- masks
- fantasy markings
- robotic attachments
- necklaces

Before creating a new category, decide whether it is genuinely independent.

If it is just another optional foreground accessory, extending Accessories may be simpler.

If users need to select it independently from existing accessories, add a category.

## Systems that may need changes

A new independent category may affect:

1. asset-family directory
2. stable ID type
3. family registry
4. `AvatarConfig`
5. `DEFAULT_AVATAR_CONFIG`
6. generic `AvatarAssetRegistry`
7. `BotAvatar` selected assets
8. layer definitions/order
9. editor adapter
10. `EditorCategoryId`
11. category navigation
12. editor selector panel
13. configuration validation, once implemented
14. persistence migration, once implemented
15. randomization, once implemented
16. compatibility rules, once implemented
17. export tests, once implemented
18. automated tests, once implemented

## Layer choice

Determine the correct visual depth first.

Example:

A necklace/scarf may naturally use the existing:

```text
neck-collar
```

layer.

Fantasy face markings may require a new layer if their correct ordering cannot be represented by existing layers.

Do not casually insert JSX directly into `BotAvatar` for every new category.

Use the registry/layer architecture unless the feature is truly a new core primitive like eyes or blush.

## Default

Every required `AvatarConfig` field needs a deterministic default.

Optional categories should generally have an explicit stable none ID such as:

```text
scarves-none
```

rather than `null`, unless the entire configuration contract is intentionally redesigned.

---

# 14. Color System

## Current configurable colors

`AvatarConfig` currently stores:

```text
skinColor
hairColor
blushColor
```

## Skin

Preset skin swatches live in:

```text
src/avatar/editor/editor-options.ts
```

The editor also supports the browser's custom color input.

`skinColor` currently drives:

- face
- ears

## Hair

Preset hair swatches also live in `editor-options.ts`.

`hairColor` currently drives:

- hair
- facial hair
- headwear primary color
- accessories

This is current adapter behavior, not necessarily a permanent product rule.

If independent headwear/accessory colors are added later, add explicit config fields rather than hiding extra state inside UI components.

## Blush

`blushColor` exists in `AvatarConfig`.

There is currently no dedicated blush-color editor category.

Do not remove the config field just because the current UI does not expose it.

## Glasses

Glasses components support a `frameColor` prop.

The editor adapter currently supplies:

```text
#171719
```

rather than an `AvatarConfig` field.

Therefore glasses frame color is component-configurable but not currently user-configurable through the main editor.

## Headwear

Headwear components may accept:

- `primaryColor`
- `secondaryColor`
- `accentColor`

The editor currently passes only a primary color derived from `hairColor`.

## Accessories

Accessories may accept:

- `color`
- optional `secondaryColor`

The editor currently passes `hairColor` as the primary accessory color.

## Color validation

There is currently no general runtime `AvatarConfig` color validator.

The native color picker expects six-digit hex and `ColorSwatchPicker` normalizes invalid display values to black for the browser input.

Future config import/persistence code SHOULD validate accepted color syntax explicitly.

Do not trust arbitrary imported strings as valid colors.

## Accessibility

Color choices MUST have readable text/ARIA labels.

Do not make color identification depend solely on visual hue.

Current swatches use descriptive `aria-label` values.

---

# 15. Editor State Architecture

The current editor state owner is:

```text
src/avatar/editor/avatar-customizer.tsx
```

It owns:

```text
config
activeCategory
```

using React `useState`.

There is currently:

- no reducer
- no React context
- no external state library

This is intentional simplicity.

## Source of truth

`AvatarConfig` state is the one source of truth for avatar selections.

Child controls receive current values and callbacks.

The preview receives the same config.

Do not create separate local state such as:

```text
selectedHair
selectedHairColor
selectedGlasses
```

that duplicates values already in `AvatarConfig`.

## Derived rendering

The SVG is always derived from `AvatarConfig`.

Do not:

- query SVG DOM nodes
- mutate SVG attributes manually
- maintain an independent exported-SVG state
- store rendered JSX in config
- serialize components

## `initialConfig`

`AvatarCustomizer` accepts an optional `initialConfig`.

It initializes state once from:

```text
initialConfig ?? createDefaultAvatarConfig()
```

It is not currently a fully controlled component.

Changing `initialConfig` after mounting does not automatically synchronize live config.

Do not add synchronization `useEffect` casually; decide whether the component should become controlled first.

## Reset behavior

Current behavior:

- with no `initialConfig`, Reset uses the canonical default
- with `initialConfig`, Reset returns to that supplied initial config

Earlier product planning described reset as canonical-default reset, so this distinction must be resolved intentionally if reset semantics are changed.

---

# 16. Persistence

## Current state

Persistence is **not implemented**.

There is currently no:

- `localStorage` code
- persistence module
- storage key
- schema version
- migration code
- import parser
- copy-config feature

Do not invent a current storage key in documentation or feature code.

## Approved first-version direction

When persistence is implemented, the intended first version is browser-local only.

Do not add authentication or backend storage merely to implement the first persistence feature.

Use a versioned envelope conceptually like:

```json
{
  "version": 1,
  "avatar": {
    "...": "..."
  }
}
```

Define the actual storage key in one constant when the feature is implemented.

## Required behavior

Future persistence should support:

- automatic restore
- reset
- copy configuration JSON
- import configuration JSON
- runtime validation
- safe fallback for removed/missing assets

## Migration expectations

Persisted asset IDs create backward-compatibility obligations.

When schema version changes:

- parse the version first
- migrate deliberately
- validate after migration
- preserve valid user choices
- fallback only invalid fields where possible
- do not silently wipe all data

Unknown optional asset IDs should usually fall back to the category's none/default value.

Unknown required IDs should fall back to the canonical default for that field.

---

# 17. Randomization

## Current state

Randomization is **not implemented**.

There is currently no compatibility engine.

## Future requirement

A randomizer must choose only registered valid values.

It must not generate strings that merely satisfy TypeScript naming patterns.

Compatibility should be centralized so the same rules can eventually support:

- editor filtering
- randomization
- import validation
- presets

Examples of future compatibility relationships:

- headwear may affect suitable hair presentation
- ear accessories may require compatible ears
- some features may be mutually exclusive
- optional categories may select their explicit none ID

Current `HeadwearAsset.hairInteraction` is descriptive metadata only.

Do not assume it already enforces anything.

## Testing randomization

When randomization exists, make the random source injectable or otherwise controllable in tests.

Tests should be deterministic.

Randomization MUST always return a valid `AvatarConfig`.

---

# 18. Export Pipeline

## Current state

File export is **not implemented**.

Do not claim SVG/PNG buttons or utilities currently exist.

## Approved export direction

The canonical pipeline should be:

```text
AvatarConfig
    ↓
BotAvatar
    ↓
SVG
```

SVG export:

```text
SVG
→ serialization
→ .svg file
```

PNG export:

```text
SVG
→ browser rasterization
→ canvas/image bitmap
→ PNG
```

Approved PNG output sizes:

```text
512 × 512
1024 × 1024
2048 × 2048
```

## Requirements

Exported appearance MUST match the live preview.

Preserve:

- colors
- head rotation
- layer order
- clipping/cropping
- background
- asset transforms
- transparency behavior inside layers

The final exported avatar should include the BotForge charcoal background because it is part of the composition.

Avoid:

- server rendering solely for PNG generation when browser APIs suffice
- external fonts in the SVG
- remote image dependencies
- separate hand-maintained export geometry

## Filename convention

A sensible future pattern is:

```text
botforge-avatar-YYYY-MM-DD.svg
botforge-avatar-YYYY-MM-DD.png
```

Do not hard-code a historical date.

---

# 19. Testing Strategy

## Current state

There are no automated tests in the repository.

There is no `test` package script.

There are no committed visual-regression tests.

Do not state otherwise.

## Minimum future coverage

When a test framework is introduced, prioritize behavior that protects architecture.

### Config tests

Test:

- canonical defaults
- valid IDs
- explicit none IDs
- future config parsing
- future migration behavior
- invalid color handling if validation is added

### Registry integrity

Test:

- duplicate IDs
- every declared ID maps to a real asset
- no registry asset has an undeclared ID
- hair assets contain a front and/or back layer
- registry layer names are valid

### Rendering

Test:

- `BotAvatar` renders one root SVG
- viewBox stays 512×512
- exactly two core eye shapes are present
- canonical layer order is preserved
- background is outside the head rotation group
- configurable assets render in the expected layer

### Defaults

Test that the default config can render without exceptions.

### Persistence

When implemented, test:

- restore
- malformed JSON
- wrong version
- missing fields
- removed IDs
- migrations
- fallback behavior

### Randomization

When implemented, test:

- only registered IDs
- none handling
- compatibility constraints
- deterministic injected RNG

### Export

When implemented, test:

- SVG serialization
- output dimensions
- SVG/PNG visual parity where practical
- cropping
- background
- supported resolution choices

### Visual regression

No visual regression system currently exists.

It would be valuable later, particularly for:

- core geometry changes
- eye visibility
- layer ordering
- representative cross-product combinations

Treat it as a future improvement, not an existing gate.

---

# 20. Mandatory Checks Before Finishing Work

Run the checks that actually exist.

For any TypeScript/avatar change:

```bash
npm exec tsc -- --noEmit
npm run lint
npm run build
```

Also manually verify, as applicable:

- no broken imports
- no duplicate asset IDs
- new IDs are represented in the family type contract
- new assets are registered
- editor option appears if expected
- default avatar renders
- both eyes remain visible
- no nose was introduced
- no mouth was introduced or implied
- the global 17° transform is applied only once
- no unexpected geometry drift occurred
- upper-right negative space remains credible
- mobile layout still works when editor UI changed
- keyboard/focus states still work when controls changed
- existing registered assets still render

When export exists and the change can affect rendering:

- exported SVG opens correctly
- 512 PNG works
- 1024 PNG works
- 2048 PNG works
- exported appearance matches preview

When persistence exists:

- existing stored configs restore
- removed/invalid IDs fall back safely
- schema migration does not destroy unrelated valid choices

## Tests

There is currently no `npm test` command.

Do not write “tests pass” unless tests have actually been added and run.

## Formatting

There is currently no format command.

Do not invent or report one.

---

# 21. Commands

The package manager is npm.

`package-lock.json` is committed.

## Install

Preferred clean install:

```bash
npm ci
```

For dependency modification:

```bash
npm install
```

## Development server

```bash
npm run dev
```

## Production build

```bash
npm run build
```

This currently runs:

```text
next build --webpack
```

## Production server / local built preview

After building:

```bash
npm run start
```

There is no separate Vite-style `preview` script.

## Lint

```bash
npm run lint
```

## Typecheck

There is no package script named `typecheck`.

Use the installed TypeScript compiler:

```bash
npm exec tsc -- --noEmit
```

## Tests

No test command currently exists.

## Format

No format command currently exists.

If a test or format tool is added later, add real package scripts and update this document.

---

# 22. TypeScript Rules

## Strict typing

The repository uses `strict: true`.

Do not weaken strictness to make a feature compile.

Fix the types.

## Avoid `any`

Do not use `any` to bypass registry/config contracts.

If external untrusted data is introduced, parse it from `unknown`.

## Asset IDs

Use exact stable string unions derived from `as const` arrays or explicit unions.

Do not return to open-ended types such as:

```ts
`hair-${string}`;
```

for registered production assets.

That makes nonexistent assets type-valid.

## Prefer string unions over enums

Current project convention uses:

```ts
const IDS = [...] as const;
type Id = (typeof IDS)[number];
```

Continue this style rather than introducing TypeScript enums.

## Selection types

Distinguish actual asset IDs from selectable none sentinels where appropriate.

For example:

```text
GlassesId
GlassesSelectionId
```

The registry contains real assets.

The selection type may additionally contain:

```text
glasses-none
```

## Props

Use explicit family prop interfaces.

Examples:

- `HairLayerProps`
- `GlassesAssetProps`
- `HeadwearProps`
- `EarAssetProps`
- `AccessoryAssetProps`

## Null and undefined

Avatar selections currently use explicit IDs rather than `null`.

Optional React props/layers may use `undefined` where appropriate.

Do not mix the two models casually.

## Exhaustive handling

When adding a new editor category or layer, update all switches that need to know about it.

When touching category handling, prefer compile-time exhaustive patterns over silently dropping unknown values.

## Type placement

Keep family-specific types next to the family.

Use `src/avatar/asset-ids.ts` as a central re-export boundary.

Keep global `AvatarConfig` in `src/avatar/types.ts`.

Avoid creating a generic `types/` dumping ground.

## Imports

The repository supports `@/*` for `src/*`.

Avatar internals currently use many relative imports.

Preserve local conventions rather than rewriting imports repository-wide during unrelated work.

---

# 23. React Rules

## Component responsibility

Keep components narrow.

Examples:

- `BotAvatar` composes
- core layers draw primitives
- asset components draw one feature
- selectors handle UI selection
- `AvatarCustomizer` owns editor state

Do not turn `BotAvatar` into an editor/state/persistence component.

## State ownership

Avatar state belongs at the editor/container level.

Asset components should be pure render functions.

## Derived state

Do not store values that can be directly derived from:

- `AvatarConfig`
- registries
- props

Examples of bad duplicated state:

```text
selectedHair + config.hairStyle
selectedFace + config.faceShape
isGlassesSelected + config.glasses
```

## Effects

Do not add `useEffect` merely to copy props into state or synchronize values that could remain derived.

Use effects only for actual side effects such as future persistence or browser APIs.

## Memoization

Do not add `useMemo`, `useCallback`, or `memo` by reflex.

Use them when profiling or meaningful identity constraints justify them.

The current renderer is small enough that clarity is more important.

## Registries

Available asset options should come from registries, not duplicated UI arrays.

Current editor asset IDs are derived through `avatarEditorRegistries`.

Color palettes are intentionally separate data because they are color options rather than asset registries.

## Large components

If `AvatarCustomizer` grows significantly while adding persistence/export/randomization, split by responsibility rather than continuing to add unrelated logic into one file.

---

# 24. Styling Rules

## Current styling system

BotForge uses Tailwind CSS 4.

Tailwind is loaded in:

```text
src/app/globals.css
```

with:

```css
@import "tailwindcss";
```

PostCSS configuration uses:

```text
@tailwindcss/postcss
```

There is currently no `tailwind.config.*` file.

## Editor appearance

Current editor conventions include:

- dark neutral backgrounds
- rounded panels
- subtle white borders
- responsive grids
- accessible focus rings
- clear selected states
- horizontal category scrolling
- vertically scrollable option grids

Preserve these conventions unless redesigning the editor intentionally.

## Responsive layout

The editor is currently:

- stacked on smaller screens
- two-column at large breakpoints
- sticky preview on large screens

When adding controls, check mobile width.

Do not assume desktop-only interaction.

## Interaction states

Interactive controls SHOULD retain:

- hover state
- focus-visible state
- selected state
- adequate hit area

## SVG geometry and CSS

Avatar geometry belongs in SVG coordinates.

DO NOT position avatar features using Tailwind transforms, absolute HTML positioning, margins, or CSS hacks.

CSS/Tailwind styles the editor shell.

SVG geometry draws the avatar.

---

# 25. Accessibility

Accessibility is required for editor controls.

## Buttons

Buttons must:

- use real `<button>` elements
- have `type="button"` where appropriate
- expose selected state where applicable
- retain keyboard focus styling

`AssetSelector` currently uses `aria-pressed`.

## Category tabs

`CategoryNav` currently uses:

- `role="tablist"`
- `role="tab"`
- `aria-selected`
- `aria-controls`
- corresponding `tabpanel`

If modifying tab behavior, preserve these relationships.

Current tabs set only the selected tab to `tabIndex=0`.

Arrow-key tab navigation is not currently implemented.

It may be added later, but do not claim it already exists.

## Colors

Color buttons must have descriptive accessible labels.

Do not rely on the visual swatch alone.

The native custom color input must retain an accessible name.

## Focus indicators

Do not remove existing `focus-visible` rings without an accessible replacement.

## Avatar SVG labeling

`BotAvatar` forwards ordinary SVG props, so callers can provide accessibility attributes.

The current component does not intrinsically insert a `<title>` or force `role="img"`.

Choose behavior based on context:

- decorative avatar: use `aria-hidden="true"`
- meaningful avatar: supply an accessible label/role

Do not hard-code one description that becomes inaccurate for every avatar.

---

# 26. Performance

BotForge should remain lightweight.

## Current strengths

Assets are:

- statically imported
- React SVG components
- not repeatedly fetched
- not parsed from external SVG strings
- relatively small

Preserve this.

## Avoid unnecessary rerenders

Keep state near its owner.

Avoid broad context/state libraries unless complexity justifies them.

## SVG complexity

Path complexity directly affects:

- rendering
- preview grids
- export cost
- maintainability

Prefer a few broad paths over hundreds of nodes.

## Asset previews

The current UI uses text asset buttons rather than rendering dozens of miniature avatars.

If rich asset previews are added and asset counts become large, consider:

- preview-specific lightweight geometry
- virtualization where genuinely needed
- memoization after measurement

Do not prematurely introduce these mechanisms.

## Memoization threshold

Memoize when:

- a component has measurable expensive rendering
- the same large SVG subtree rerenders unnecessarily
- prop identity matters for a specific API

Do not memoize trivial components merely because they are React components.

---

# 27. Dependency Policy

Do not add dependencies casually.

Before adding one, check:

1. can a browser API solve this?
2. can React/Next solve this?
3. can an existing dependency solve this?
4. would a small internal utility be simpler?
5. is the maintenance/bundle cost justified?

Examples:

- SVG serialization usually does not need a large library
- browser canvas can usually handle PNG rasterization
- `localStorage` does not need a state library
- simple validation may not require a large schema dependency unless complexity warrants it

Do not introduce heavyweight:

- UI frameworks
- state managers
- SVG libraries
- canvas engines
- image-generation SDKs

for small features without a clear architectural reason.

Any new dependency should have an explicit purpose.

---

# 28. Backward Compatibility

The following changes are potentially breaking.

## Asset IDs

Changing:

```text
hair-short-side-part
```

to another string can break:

- future localStorage
- imported JSON
- shared URLs
- presets
- backend data

Prefer keeping IDs stable.

If renaming is required once persistence exists, migrate or alias the old ID.

## Registry removals

Removing an asset should not make the whole configuration unloadable.

Future validators should fall back at the affected field.

## AvatarConfig structure

Adding/removing/renaming fields requires versioning once serialized configs exist.

## Persistence storage key

Once introduced, changing the key without migration can make all existing local saves appear lost.

## Coordinate system

Changing the canvas, pivot, or foundational geometry can break every asset.

Treat such changes as design-system migrations.

## Layer ordering

Reordering layers can alter many combinations.

Treat it as a compatibility change.

## Export semantics

Once users can export, changing:

- crop
- background
- dimensions
- SVG structure
- filename meaning

may be user-visible behavior.

Document intentional changes.

---

# 29. Source-of-Truth Hierarchy

When sources disagree, use this precedence:

1. explicit current user/product request
2. installed Next.js documentation for framework-specific behavior
3. current executable tests/contracts, once tests exist
4. current compiling source implementation and `package.json`
5. canonical BotForge contracts:
   - `src/avatar/types.ts`
   - `src/avatar/design-system.ts`
   - `src/avatar/components/avatar-layer.tsx`
   - family `types.ts`
   - family registries

6. this `AGENTS.md`
7. README and older planning documents

For Next.js framework APIs, do not trust model memory over the installed Next.js 16 documentation.

The current README is largely the generic create-next-app README and is not a BotForge architecture specification.

Do not preserve stale planning behavior when current implementation and current requirements clearly supersede it.

Conversely, do not silently reinterpret a current product invariant merely because a local implementation accidentally violates it.

Call out genuine conflicts.

---

# 30. What Agents Must NOT Do

DO NOT:

- introduce a mouth
- introduce a nose
- add eyebrows
- add realistic eyes
- add pupils or irises
- add eye highlights
- casually change capsule-eye geometry
- fully cover either eye
- allow opaque sunglasses to hide the eyes
- make facial hair imply a mouth
- remove the 17° composition without explicit approval
- re-center the avatar casually
- eliminate the upper-right negative space accidentally
- bypass `AvatarConfig`
- store JSX/components inside `AvatarConfig`
- mutate the rendered SVG DOM as application state
- duplicate avatar state across editor controls
- hard-code asset option arrays separately from registries
- dynamically discover assets from arbitrary string file paths
- duplicate registry data unnecessarily
- create one asset per color
- introduce raster avatar assets where vector geometry is appropriate
- embed external image URLs in avatar SVG
- embed base64 raster images
- add external stylesheets to avatar SVG
- add text or logos inside avatars
- apply the global 17° transform inside individual assets
- rename stable IDs casually
- return to open-ended asset-ID string types
- scatter shared geometry constants across assets
- create a second global geometry source
- silently change core design-system coordinates
- add major dependencies without justification
- replace deterministic rendering with generative AI
- add runtime AI as a renderer dependency
- remove existing functionality merely to simplify a refactor
- rewrite unrelated modules during a small task
- perform broad formatting changes alongside functional changes
- add temporary debug output and leave it committed
- claim tests passed without running tests
- claim a format check passed when no formatter exists
- claim persistence/export/randomization exists when it does not

Also do not remove or move the generated Next.js agent-rules block at the top of this file. `next dev` may recreate it.

---

# 31. Change Discipline

Use this workflow for every task.

1. Inspect the relevant implementation.
2. Inspect the relevant family `types.ts` and registry.
3. Inspect `AVATAR_DESIGN` if geometry is involved.
4. Inspect layer ordering if depth is involved.
5. Understand existing conventions before editing.
6. Make the smallest coherent change.
7. Reuse existing abstractions.
8. Update stable ID types/contracts when necessary.
9. Update defaults only when intentionally required.
10. Update editor plumbing if the feature is user-selectable.
11. Update tests when a test system exists.
12. Run TypeScript.
13. Run lint.
14. Run build.
15. Visually inspect rendering when SVG/UI changed.
16. Summarize meaningful changes and any unresolved limitations.

Do not perform opportunistic cleanup of unrelated code.

If a feature genuinely requires a major architectural change, explain why that change is required rather than hiding a rewrite inside a small feature.

---

# 32. Refactoring Policy

Refactoring is encouraged when it:

- removes meaningful duplication
- consolidates genuinely duplicated sources of truth
- strengthens asset-ID typing
- improves registry integrity
- simplifies future category addition
- clarifies layer ownership
- removes architecture drift
- fixes a real bug
- makes persistence/export safer

Refactoring is discouraged when it:

- is purely stylistic
- changes quote style across unrelated files
- renames everything for consistency
- moves files without architectural benefit
- introduces speculative abstraction
- adds generic factories where a small explicit registry is clearer
- changes public behavior without a requirement
- touches unrelated asset geometry

Preserve behavior unless the task asks to change it.

A good BotForge abstraction should make the next real asset/category easier to add.

An abstraction whose only purpose is reducing a few lines of obvious code is usually not necessary.

---

# 33. Git / Commit Guidance

There is no repository-specific CI contract currently visible in source, so do not invent one.

Recommended commit boundaries:

- one feature per logical commit
- keep a new asset and its registry/type changes together
- keep an `AvatarConfig` migration with its validator/migration changes
- separate broad refactors from unrelated feature work
- avoid mixing mass formatting with functional changes

Examples:

```text
feat: add hair-short-textured
feat: add necklace category
fix: preserve explicit none selections
refactor: consolidate avatar geometry anchors
```

Generated assets and the registry changes required to make them usable belong in the same logical commit.

---

# 34. Documentation Expectations

Update documentation when behavior changes materially.

## Update `AGENTS.md` when

- architectural source-of-truth changes
- a major subsystem is added
- persistence/export/randomization becomes implemented
- commands or package scripts change
- a test framework is introduced
- layer contracts change
- asset registry architecture changes
- config/versioning rules change

## Update README when

- user/developer setup changes
- real product usage instructions are added
- deployment/setup requirements change

The current README is generic Next.js starter content and should eventually be replaced with BotForge-specific documentation.

## Inline comments

Prefer comments that explain:

- why geometry is constrained
- why layering is unusual
- why a compatibility rule exists
- why a specific browser/export workaround is needed

Avoid comments that simply restate obvious JSX.

---

# 35. Future Extension Guidance

The architecture should allow new capabilities without replacing the deterministic renderer.

Potential future features include:

- additional avatar categories
- presets
- shareable URLs
- local persistence
- configuration import/export
- PNG/SVG export
- backend accounts
- cloud saves
- collaborative avatar creation
- themes
- animation
- image/photo-based feature suggestions
- optional AI-assisted configuration
- community/marketplace asset packs

## Presets

A preset should normally be:

```text
named validated AvatarConfig
```

not a separate renderer.

## Shareable URLs

Encode or reference a versioned config.

On decode:

- parse
- validate
- migrate if needed
- render through existing `BotAvatar`

Do not serialize JSX.

## Backend saves

A backend should store versioned avatar configuration rather than a separately-maintained rendered image as the primary source.

Generated preview images may be cached secondarily.

## Animation

If animation is introduced, preserve the underlying layer geometry and deterministic base state.

Avoid requiring animation merely to render a static avatar.

## AI/photo support

Preferred future flow:

```text
photo
    ↓
feature classifier / AI suggestion
    ↓
validated AvatarConfig
    ↓
existing deterministic BotForge renderer
```

Preferred AI output is configuration.

AI should suggest:

- face ID
- hair ID
- colors
- glasses ID
- etc.

The final avatar should still be assembled by BotForge's deterministic SVG renderer whenever possible.

Do not change the architecture to:

```text
photo
→ generative image
→ final avatar
```

unless product direction explicitly changes.

---

# 36. Agent Task Examples

## “Add another hairstyle”

Likely affected:

```text
src/avatar/assets/hair/types.ts
src/avatar/assets/hair/assets/<new-file>.tsx
src/avatar/assets/hair/assets/index.ts
src/avatar/assets/hair/registry.ts
```

Usually not affected:

```text
BotAvatar
AvatarCustomizer
layer ordering
```

unless the hairstyle exposes an architectural issue.

Check eyes and headwear interactions visually.

## “Add necklaces as a category”

Determine first whether Necklace is independent from Accessories.

If independent, likely affected:

```text
AvatarConfig
default config
new asset family
asset ID exports
generic registry
BotAvatar selected-assets list
editor adapter
editor categories
editor panel/options
neck-collar layer usage
future persistence/randomization
```

Do not put necklace JSX directly into `BotAvatar`.

## “Change the eye dimensions”

Primary change:

```text
src/avatar/design-system.ts
```

Then inspect:

- `EyesLayer`
- glasses adapter
- glasses layout
- every glasses asset
- hairstyle eye clearance
- headwear eye-safe region
- accessory eye clearance

Because glasses derive their anchors from eye constants, this change has broader visual consequences.

Do not manually patch each glasses asset with new eye coordinates.

## “Add an avatar preset system”

Presets should contain valid `AvatarConfig` values.

Likely add:

- preset data/types
- preset selector UI
- validation when loading a preset

Do not modify `BotAvatar`.

Applying a preset should replace/update the canonical config.

## “Add URL sharing”

Add:

- versioned serializer
- URL encoder/decoder
- validation
- migration support
- share UI

Do not encode component names or JSX.

Invalid URL asset IDs must safely fall back.

The renderer remains unchanged.

## “Add backend persistence”

Add persistence around `AvatarConfig`.

Likely work:

- API/data schema
- versioned config storage
- validation
- authentication only if explicitly requested
- migration strategy

Do not move rendering to the backend merely because storage becomes server-backed.

## “Add photo-based automatic configuration”

Add an optional analysis layer:

```text
photo
→ suggested feature IDs/colors
→ validate against registries
→ AvatarConfig
→ BotAvatar
```

Do not let a model return arbitrary SVG and bypass the registry system.

## “Refactor the asset registry”

First account for current architecture:

- faces render through their family registry directly
- other categories are normalized through `avatar-editor-adapter.ts`
- hair supports two layers
- accessories choose their render layer
- optional none IDs are selection values, not real asset definitions

A registry refactor must preserve those behaviors or intentionally replace them.

---

# 37. Troubleshooting Guide

## Asset appears misaligned

Check, in order:

1. is the asset authored in 512×512 coordinates?
2. is it inside `HeadRotationGroup` through the normal renderer?
3. did the asset accidentally add the global 17° transform itself?
4. is it using the correct `AVATAR_DESIGN` anchor?
5. is the path authored relative to that anchor as expected?
6. is it intended to crop outside the viewport?

Do not “fix” shared misalignment by adding arbitrary CSS offsets.

## Hair covers an eye

Inspect the `hair-front` path against:

```ts
AVATAR_DESIGN.eyes;
```

Reduce/re-shape the hair geometry.

Do not move the canonical eyes to accommodate one hairstyle.

## Accessory covers an eye

Check its shared feature anchor and local offsets.

Move/reshape the accessory rather than changing the eye system.

## Asset color does not change

Check:

- family prop contract
- editor adapter prop mapping
- whether paths use `currentColor`
- whether a parent `<g color={...}>` exists when using `currentColor`
- whether an explicit `fill` overrides it

For headwear/accessories, remember current editor color is derived from `hairColor`.

## Glasses color does not change from the editor

This is currently expected.

The editor adapter currently provides a fixed frame color.

Glasses components themselves support `frameColor`, but the main `AvatarConfig` has no glasses-color field.

## Registry entry does not appear in editor

Check:

- family ID type/constant
- component export
- family registry
- hair `hairAssets` array if adding hair
- editor registry derivation
- spelling of the stable ID

Do not add a hard-coded editor button as a workaround.

## TypeScript rejects a new asset ID

This usually means the stable ID has not been added to the family ID contract.

Update the family `types.ts`.

Do not cast arbitrary strings to the ID type as the final solution.

## “None” is not selected correctly

Optional selectors should use explicit stable none IDs.

Do not pass `null`.

Current examples:

```text
glasses-none
facial-hair-none
headwear-none
accessory-none
```

`hair-none` exists in the type but is not currently exposed by the Hair UI.

## Reset does not go to the canonical default

Check whether `AvatarCustomizer` received `initialConfig`.

Current reset behavior uses the supplied initial configuration when present.

## Ears/accessories appear to use unexpected anchors

Inspect:

```ts
AVATAR_DESIGN.featureAnchors;
```

Some older/general values also exist under:

```ts
AVATAR_DESIGN.anchors;
```

Do not assume identically named concepts use identical coordinates.

Trace the current component usage before changing them.

## Saved config no longer loads

Persistence is not currently implemented.

Once implemented, investigate:

- schema version
- migration
- registry ID validation
- fallback rules
- storage key

Do not delete all saved data as the first recovery strategy.

## Randomizer selects an invalid asset

Randomization is not currently implemented.

When introduced, choices must come from registries and compatibility rules rather than manually-maintained string arrays.

## PNG differs from SVG preview

PNG export is not currently implemented.

When implemented, inspect:

- serialization
- root viewBox
- output scale
- background
- canvas dimensions
- image decode timing
- browser SVG rasterization
- transforms
- viewport clipping

The SVG preview remains the visual authority.

## Export crop differs from preview

Do not create a separate export crop.

Use the canonical:

```text
0 0 512 512
```

SVG viewport as the source.

---

# 38. Definition of Done

A BotForge change is complete only when all applicable conditions are satisfied.

## Implementation

- requested behavior works
- implementation follows the existing architecture
- unrelated functionality is preserved

## Types

- TypeScript passes
- asset IDs are valid exact types
- no unnecessary `any` or unsafe casts were added

## Quality checks

- `npm exec tsc -- --noEmit` passes
- `npm run lint` passes
- `npm run build` passes

If a future test suite applies:

- relevant tests pass

## Avatar integrity

For visual changes:

- exactly two capsule eyes remain
- both eyes remain visible
- no mouth exists
- no nose exists
- face remains rounded/stylized
- composition remains tilted
- upper-right negative space remains intentional
- geometry uses canonical coordinate conventions
- layer order is correct
- colors work
- 512×512 crop is correct

## Architecture

- `AvatarConfig` remains the state source of truth
- assets are registered rather than hard-coded into UI
- no duplicated rendering engine was introduced
- no unnecessary dependency was added

## Compatibility

Where applicable:

- stable IDs are preserved
- old configs remain recoverable
- migrations are provided
- defaults remain valid

## Export

Once export exists and is affected:

- SVG matches preview
- PNG matches preview
- all supported resolutions work

## Documentation

Update:

- this file for architectural changes
- README for setup/user-facing changes
- relevant contracts/comments where necessary

## Cleanliness

- no debug code
- no temporary assets
- no unused compatibility hacks
- no unrelated refactors
- no false claims about tests/checks

---

# 39. Nested AGENTS.md Strategy

Do not create nested agent-instruction files merely because directories exist.

The root instructions are currently sufficient.

Introduce a nested `AGENTS.md` only when a subsystem develops enough unique constraints that agents repeatedly need substantial local guidance.

Possible future candidates:

```text
src/avatar/assets/AGENTS.md
src/avatar/editor/AGENTS.md
src/avatar/persistence/AGENTS.md
src/avatar/export/AGENTS.md
```

A nested file may be justified if, for example:

- asset authoring gains automated geometry validation
- export develops browser-specific constraints
- persistence gains multiple schema migrations
- the editor develops a substantial state architecture

Nested instructions should augment the root contract, not duplicate it.

Do not use nested files to override core invariants such as:

- two eyes
- no mouth
- no nose
- deterministic SVG
- canonical coordinate system

unless the product specification explicitly changes.

---

# 40. Current Known Gaps and Cleanup Notes

These are known characteristics of the current repository. Agents should not rediscover them and mistake them for already-solved systems.

## Hair none selection

`HairStyleSelectionId` supports:

```text
hair-none
```

but the current Hair editor does not expose a None control.

Resolve intentionally if working on hairstyle selection or optional-category behavior.

## Reset semantics

`AvatarCustomizer` resets to `initialConfig` when provided.

Without `initialConfig`, it resets to `DEFAULT_AVATAR_CONFIG`.

If product requirements require Reset to always mean canonical default, change this intentionally and document it.

## Geometry naming

`AVATAR_DESIGN` contains both `anchors` and `featureAnchors`.

Several current feature assets use `featureAnchors`.

Glasses derive placement from canonical eye/face geometry.

Do not consolidate names by guesswork.

Inspect usage and preserve visual output.

## Face reference bounds vs face paths

Selectable face assets contain their own path geometry.

`AVATAR_DESIGN.face` is a shared reference bound and currently informs glasses layout, but changing it does not automatically reshape face asset paths.

Coordinate changes must account for both.

## Headwear envelope

`AVATAR_DESIGN.headwearGeometry` defines useful shared reference constraints.

Current headwear components still contain their actual SVG path coordinates directly.

Do not assume the envelope programmatically guarantees eye safety.

Visual validation is still required.

## Compatibility

No compatibility-rule engine currently exists.

Metadata such as `hairInteraction` must not be described as enforcement.

## Persistence

Not implemented.

## Randomization

Not implemented.

## Export

Not implemented.

## Automated tests

Not implemented.

## Formatter

Not configured.

## README

The root README is still largely generic Next.js starter documentation and should not override this architecture.

---

# 41. Quick Reference for Coding Agents

Before changing avatar code, identify which layer owns the concern:

```text
configuration contract
→ src/avatar/types.ts

stable asset IDs
→ asset family types.ts
→ src/avatar/asset-ids.ts re-exports

shared geometry
→ src/avatar/design-system.ts

layer ordering
→ src/avatar/components/avatar-layer.tsx

complete SVG composition
→ src/avatar/bot-avatar.tsx

core eyes/blush/background/face composition
→ src/avatar/components/core-layers.tsx

asset implementation
→ src/avatar/assets/<family>/

family registration
→ src/avatar/assets/<family>/registry.ts

renderer registry adaptation
→ src/avatar/editor/avatar-editor-adapter.ts

editor state
→ src/avatar/editor/avatar-customizer.tsx

editor categories/colors/options
→ src/avatar/editor/editor-options.ts

application route
→ src/app/page.tsx
```

When uncertain, preserve the deterministic flow:

```text
stable IDs
→ AvatarConfig
→ registries
→ ordered SVG layers
→ BotAvatar
```

That is the core BotForge architecture.
