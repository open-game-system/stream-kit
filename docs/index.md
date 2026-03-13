# Stream Kit Docs

Start here, then load only the document you need.

| Topic | Location |
|---|---|
| Architecture and repo boundaries | [architecture.md](./architecture.md) |
| OGS integration model and third-party developer story | [integration.md](./integration.md) |
| Current verified state and next steps | [status.md](./status.md) |
| Phase 2 execution plan | [next-steps.md](./next-steps.md) |
| Cloudflare example walkthrough | [../examples/bun-stream-server/README.md](../examples/bun-stream-server/README.md) |

## Quick Summary

- The Cloudflare example is the current source of truth for end-to-end streaming.
- The long-term product should be OGS-owned infrastructure, not self-hosting by third-party game developers.
- `stream-kit` should become the simple client SDK layer, likely hiding `app-bridge` internally when running inside `opengame-app`.
