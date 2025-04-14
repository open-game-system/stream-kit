# ☁️ @open-game-system/stream-kit

Monorepo for the Open Game System (OGS) Cloud Rendering service ("Stream Kit").

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

Stream Kit enables web games to offload intensive graphics rendering to powerful cloud servers and stream the output via WebRTC to the client. This allows for high-fidelity experiences even on devices with limited GPU capabilities.

This monorepo contains the core libraries, React bindings, and server implementation for the Stream Kit service.

## Packages

-   [`@open-game-system/stream-kit-types`](packages/stream-kit-types): Core TypeScript types.
-   [`@open-game-system/stream-kit-web`](packages/stream-kit-web): Core client library for web browsers.
-   [`@open-game-system/stream-kit-react`](packages/stream-kit-react): React hooks and components.
-   [`@open-game-system/stream-kit-server`](packages/stream-kit-server): Server-side implementation (headless browser management, signaling).

## Development

This project uses `pnpm` workspaces and `turbo` for managing the monorepo.

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
2.  **Build all packages:**
    ```bash
    pnpm build
    ```
3.  **Run tests:**
    ```bash
    pnpm test
    ```

## Contributing

Contributions are welcome! Please see `CONTRIBUTING.md` (to be created).

## License

MIT License. 