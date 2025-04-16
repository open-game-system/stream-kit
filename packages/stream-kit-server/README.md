# @open-game-system/stream-kit-server

Server-side implementation for the Open Game System (OGS).

## Overview

This package provides a hook-based router/middleware (`createStreamKitRouter`) for managing stream state persistence. By implementing `StreamKitHooks`, you can integrate with various storage backends (Redis, Cloudflare KV, etc.) to save, load, and delete stream state.

This package is designed to be used alongside other OGS components or custom logic that handles the actual browser automation (like Puppeteer) and WebRTC streaming.

## Installation

```bash
npm install @open-game-system/stream-kit-server @open-game-system/stream-kit-types
# or
pnpm add @open-game-system/stream-kit-server @open-game-system/stream-kit-types
# or
yarn add @open-game-system/stream-kit-server @open-game-system/stream-kit-types
```

**Requirements:**

- For Puppeteer-based rendering, your server environment needs Google Chrome/Chromium and ffmpeg installed.
- A Dockerfile setup will be required for production deployments. Documentation for this will be provided separately.
- For the hook-based router, install the necessary client library for your chosen storage (e.g., `ioredis`).

## Usage (Hook-Based Architecture)

The core idea is to implement storage interactions via hooks and pass them to the `createStreamKitRouter` factory.

### Example: Using Redis for Storage (Node.js/Bun)

1. **Define Environment/Context:**

```typescript
// src/redis-client.ts
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redisClient;

export interface AppEnv {
  redis: Redis.Redis;
}
```

2. **Implement Storage Hooks:**

```typescript
// src/streamkit-hooks-redis.ts
import type { StreamKitHooks } from "@open-game-collective/stream-kit-server";
import type { AppEnv } from "./redis-client";
import redisClient from "./redis-client";

const getStreamKey = (streamId: string) => `stream:${streamId}:state`;

export const redisStreamKitHooks: StreamKitHooks<AppEnv> = {
  async saveStreamState({ streamId, state, env }) {
    const redis = redisClient;
    await redis.set(getStreamKey(streamId), JSON.stringify(state));
  },

  async loadStreamState({ streamId, env }) {
    const redis = redisClient;
    const stateJson = await redis.get(getStreamKey(streamId));
    return stateJson ? JSON.parse(stateJson) : null;
  },

  async deleteStreamState({ streamId, env }) {
    const redis = redisClient;
    await redis.del(getStreamKey(streamId));
  },

  async *subscribeToStateChanges({ streamId, env, lastEventId }) {
    // Implement your state change subscription logic here
    // This could use Redis pub/sub, WebSocket connections, etc.
    // Must yield StateChange objects: { type: 'patch' | 'snapshot', data: unknown, id?: string }
  }
};
```

3. **Integrate Router:**

```typescript
// src/server.ts
import { createStreamKitRouter } from "@open-game-collective/stream-kit-server";
import { redisStreamKitHooks } from "./streamkit-hooks-redis";
import redisClient from "./redis-client";

// Create router with hooks
const streamRouterHandler = createStreamKitRouter<AppEnv>({
  hooks: redisStreamKitHooks
});

// Create environment object that includes storage
const env: AppEnv = {
  redis: redisClient
};

// Set up server (example using Bun)
Bun.serve({
  port: 3000,
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/stream/")) {
      return streamRouterHandler(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },
});
```

## API Reference

### `createStreamKitRouter<TEnv>(config)`

Creates a request handler function suitable for environments like Cloudflare Workers, Node.js, Deno, or Bun.

- `config`: Configuration object
  - `hooks: StreamKitHooks<TEnv>`: Required. An object containing your implementations of the storage interaction hooks.
- Returns: `(request: Request, env: TEnv) => Promise<Response>`

**Endpoints:**

- `GET /stream/:streamId`: Loads stream state
- `GET /stream/:streamId/sse`: Server-Sent Events for state changes
- `POST /stream/:streamId`: Saves stream state (expects JSON body)
- `DELETE /stream/:streamId`: Deletes stream state

### `StreamKitHooks<TEnv>` Interface

This interface defines the required functions for handling storage operations:

- `saveStreamState(params: { streamId: string; state: unknown; env: TEnv }): Promise<void>`
- `loadStreamState(params: { streamId: string; env: TEnv }): Promise<unknown | null>`
- `deleteStreamState(params: { streamId: string; env: TEnv }): Promise<void>`
- `subscribeToStateChanges(params: { streamId: string; env: TEnv; lastEventId?: string }): AsyncIterable<StateChange>`

## License

MIT License