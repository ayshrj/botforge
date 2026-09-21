<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Use kebab-case for all new non-route filenames and directories. Preserve Next.js App Router special filenames such as `page.tsx` and `layout.tsx`.
- Keep avatar source organized by responsibility: core rendering files in `src/avatar`, reusable renderer components in `src/avatar/components`, editor UI in `src/avatar/editor`, and each asset family with its own assets, `registry.ts`, and `types.ts` under `src/avatar/assets`.
- Place an asset family registry beside that family; do not add a separate cross-cutting registry directory.
- When moving or renaming source files, update every import and verify with `npm exec tsc -- --noEmit` and `npm run build`.
