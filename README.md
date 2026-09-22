# BotForge

BotForge is a playful, deterministic avatar studio built with Next.js, React, and TypeScript. Choose a face, pose, hair, colors, glasses, facial hair, headwear, ears, accessories, and background; every selection is rasterized into an export-ready PNG.

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
- 31 hairstyles, with short, flowing, curly, and tied filters; sculpted silhouettes and broad color accents on redesigned cuts
- Optional blinking and gentle preview motion, with a pause control and reduced-motion support
- Undo/redo, reset, randomize, and configuration copy
- Validated browser-local persistence
- High-resolution PNG preview, PNG option cards, and 512/1024/2048 PNG export (always with open eyes)
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
