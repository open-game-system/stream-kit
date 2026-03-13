# @open-game-system/stream-kit

Stream Kit is the Open Game System's cloud rendering and remote streaming workspace.

Today this repo contains two layers:

- the reusable SDK packages under [`packages/`](./packages)
- the working Cloudflare streaming runtime under [`examples/bun-stream-server/`](./examples/bun-stream-server)

The recent Cloudflare work is now verified end to end: the deployed example successfully boots a container, launches Chromium, captures a page, and delivers playable video to the receiver over WebRTC using Cloudflare TURN.

## Read This First

- Repo map: [`docs/index.md`](./docs/index.md)
- Architecture: [`docs/architecture.md`](./docs/architecture.md)
- OGS integration guide: [`docs/integration.md`](./docs/integration.md)
- Current status and next steps: [`docs/status.md`](./docs/status.md)

## What This Repo Is For

The long-term product direction is:

- third-party web games integrate a small `stream-kit` SDK
- `stream-kit` hides the `app-bridge` details when running inside `opengame-app`
- `opengame-api` exposes the product-facing control plane
- OGS-owned Cloudflare Workers/Containers run the streaming infrastructure

That means third-party developers should not need to deploy their own Workers, TURN servers, or container stacks just to use cloud rendering in the OGS ecosystem.

## What Works Today

- Local streaming works through the Bun/container example.
- Deployed streaming works through the Cloudflare example.
- Cloudflare TURN-backed WebRTC connectivity is working in the deployed path.
- Session routing is isolated per receiver session.
- Worker seam tests cover TURN normalization, debug auth, and session routing.

## Workspace Layout

- [`packages/stream-kit-types`](./packages/stream-kit-types): shared TypeScript types
- [`packages/stream-kit-web`](./packages/stream-kit-web): browser-side `RenderStream` client primitives
- [`packages/stream-kit-react`](./packages/stream-kit-react): React bindings around an existing stream
- [`packages/stream-kit-server`](./packages/stream-kit-server): experimental server-side abstractions
- [`packages/stream-kit-testing`](./packages/stream-kit-testing): testing helpers
- [`examples/bun-stream-server`](./examples/bun-stream-server): working Cloudflare Worker/DO/container example

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
```

## Notes

- The reusable package API is still behind the working Cloudflare example in product maturity.
- The current OGS-facing SDK shape described in `docs/integration.md` is a target design, not a fully published package contract yet.

## License

MIT
