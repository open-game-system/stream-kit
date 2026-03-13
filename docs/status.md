# Stream Kit Status

## What Has Been Completed

Recent verified work in this repo:

- Cloudflare deployed streaming now works end to end.
- Cloudflare TURN credentials are minted and normalized by the Worker.
- The receiver and sender both use the same ICE configuration.
- Worker tracing and debug tooling were added to diagnose deployed failures.
- Worker seam tests cover TURN normalization, debug endpoint auth, and session routing.
- Session routing now uses a per-receiver session ID instead of a single shared singleton.
- The `pnpm test` hang caused by watch mode in `packages/stream-kit-web` was fixed.

Relevant commits:

- `08235c9` Add Cloudflare TURN-backed deployed streaming
- `756091f` Harden Worker boundaries and add seam tests
- `2edf3f4` Isolate streamed sessions per receiver

## What Is Working Today

- Local Bun/container example
- Local receiver playback
- Deployed Worker + Durable Object + container boot
- Chromium page navigation inside the container
- WebRTC media delivery in the deployed environment

## Main Risks / Gaps

- `/ice-servers` is still public and should be hardened before wider rollout.
- The Cloudflare example is still the source of truth; the reusable package surface is behind it.
- Current docs and package READMEs still need further productization cleanup so they match the desired OGS SDK story.

## What Needs To Be Done Next

See also: [`next-steps.md`](./next-steps.md)

### Productization

- define the public `stream-kit` SDK API
- decide exactly how `app-bridge` is hidden inside the SDK
- decide whether the stream runtime remains a sibling service or becomes a formal internal package

### OGS Integration

- add `opengame-api` endpoints for stream/cast session lifecycle
- define app-to-backend session flow for OGS-owned infrastructure
- define third-party developer configuration and game registration needs

### Hardening

- gate `/ice-servers` so TURN credentials cannot be minted anonymously
- decide whether `/debug-state` stays debug-only or is removed in production
- add more seam/integration coverage around stream startup and runtime failures

### Docs

- align package-level READMEs with the current OGS direction
- publish a first-class getting started guide for React and non-React games
- document the exact Worker secrets and deployment assumptions for the example
