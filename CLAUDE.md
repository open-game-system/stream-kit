# AGENTS.md

## Project

- **Name:** Stream Kit
- **Description:** OGS cloud rendering and remote streaming workspace
- **Tech stack:** TypeScript, pnpm workspaces, Turbo, Vitest, Cloudflare Workers, Durable Objects, Containers, PeerJS, Puppeteer
- **Package manager:** pnpm
- **Source layout:**
  - `packages/` — reusable SDK and testing packages
  - `examples/bun-stream-server/` — working Cloudflare runtime example
  - `docs/` — repo map, integration guidance, and current status

## Feedback Commands

Run in this order before committing:

1. `pnpm test`
2. `pnpm typecheck`
3. `pnpm build`

## Knowledge Base

Start here. Load deeper docs only when needed.

| Topic | Location |
|---|---|
| Docs catalog | [docs/index.md](docs/index.md) |
| Architecture | [docs/architecture.md](docs/architecture.md) |
| OGS integration and target SDK shape | [docs/integration.md](docs/integration.md) |
| Current verified state and next steps | [docs/status.md](docs/status.md) |
| Cloudflare example walkthrough | [examples/bun-stream-server/README.md](examples/bun-stream-server/README.md) |
| Workspace overview | [README.md](README.md) |

> Progressive disclosure: do not load all docs up front. Start with this file, then open only the doc that matches the task.

## Current Reality

- The deployed Cloudflare example is working end to end.
- The package layer is still less mature than the example runtime.
- The intended product direction is OGS-owned infrastructure with a simpler client-facing `stream-kit` SDK.
- `app-bridge` should likely be hidden inside the eventual OGS SDK experience rather than exposed as the primary developer API.

## Boundaries

- `stream-kit` should own streaming runtime and SDK behavior.
- `opengame-api` should own the public control plane.
- `opengame-app` should own native cast and app-shell UX.

## Key Conventions

- Prefer `rg` for search.
- Use `apply_patch` for manual code edits.
- Never revert user changes unless explicitly asked.
- Treat `examples/bun-stream-server/` as the source of truth for end-to-end behavior.
- Keep docs aligned with verified behavior; if the architecture changes, update `docs/`.

## Git

- Current branch work should go through a `codex/*` branch for PR prep.
- Keep commits focused and descriptive.
