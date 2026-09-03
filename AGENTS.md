<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: CSC-THTD

Web app that displays data (text + images) fetched from Google Sheets / Google Drive API. Authentication is JWT stored in HTTP-only cookies, with credentials validated against rows in a Google Sheet.

## Stack

- **Next.js 16.3.4** (App Router, Turbopack by default) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — uses `@theme inline {}` blocks, NOT `tailwind.config.js`
- **Bun** as package manager (`bun.lock`, `packageManager: "bun@1.4.0"`)
- **UI components**: copy/adapt from [reactbits.dev](https://reactbits.dev/) — not installed as a dependency; components are pasted into the project
- **Theme**: dark base with purple/orange accent palette

## Commands

```bash
bun dev          # dev server (Turbopack on by default in Next 16)
bun run build    # production build
bun run lint     # eslint (flat config in eslint.config.mjs)
```

No test runner is configured yet.

## Architecture

- `app/layout.tsx` — root layout, uses Next 16 generated `LayoutProps<"/">` type (from `.next/types/routes.d.ts`). Use `LayoutProps<'/route'>` for new layouts, NOT manual `{ children, params }` typing.
- `app/page.tsx` — home page (currently default scaffold)
- `app/globals.css` — Tailwind v4 entry (`@import "tailwindcss"`) + CSS custom properties via `@theme inline`
- `@/*` path alias maps to project root (configured in `tsconfig.json`)

## Key conventions

- **Next.js 16 breaking changes**: `params`, `searchParams`, `cookies()`, `headers()` are all async (Promise-based). Always `await` them. See `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
- **Turbopack is default** — no `--turbopack` flag needed. If adding a custom webpack config, the build will fail; use `--webpack` flag to opt out.
- **Tailwind v4** — no `tailwind.config.js` file. Theme customization goes in `globals.css` using `@theme inline {}`. The `@tailwindcss/postcss` plugin handles everything.
- **Google Sheets as data source** — no database. Sheet IDs, API keys, and credential rows are external config (likely `.env.local`, which is gitignored).
- **JWT auth** — HTTP-only cookies only, no client-side token storage. Password comparison happens server-side against Google Sheet data.
- **reactbits.dev components** — these are copy-paste components, not an npm package. When adding one, adapt it to the project's dark purple/orange theme and Tailwind v4 syntax.

## Env files

`.env*` is gitignored. You'll need `.env.local` with Google Sheets API credentials and JWT secret at minimum. Ask the user for values — don't invent them.
