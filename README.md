# BotForge

BotForge is a playful, deterministic SVG avatar studio built with Next.js, React, and TypeScript. Choose a face, pose, hair, colors, glasses, facial hair, headwear, ears, accessories, and background; every selection is composed into one export-ready SVG.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Face-aware placement for eyes, hair, glasses, facial hair, ears, headwear, and accessories
- Upright, soft-tilt, and strong-tilt poses using one coherent head transform
- Visual option previews and curated/custom color controls
- Undo/redo, reset, randomize, and configuration copy
- Validated browser-local persistence
- SVG and 512/1024/2048 PNG export
- Responsive keyboard- and touch-friendly editor

Saved avatars remain in the current browser under the versioned `botforge.avatar.v1` localStorage key. No account or backend is required.

## Quality checks

```bash
npm exec tsc -- --noEmit
npm run lint
npm test
npm run build
```

The Playwright suite uses installed Chrome to exercise both desktop and mobile editor behavior.
