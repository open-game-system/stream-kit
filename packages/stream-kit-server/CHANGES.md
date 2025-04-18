# Changelog

## [Unreleased] - Hook-Based Architecture

This version establishes the primary architecture for `@open-game-system/stream-kit-server` based on a hook system.

- **Core Export:** The main entry point is the `createStreamKitRouter<TEnv>` function.
- **Hook Interface:** Users must provide an implementation of the `StreamKitHooks<TEnv>` interface (`saveStreamState`, `loadStreamState`, `deleteStreamState`, `subscribeToStateChanges`) to handle persistence and real-time updates.
- **Abstraction:** This decouples the core routing and SSE logic from specific storage backends (KV, Redis, Durable Objects, Databases, etc.).
- **Router Functionality:** The created router handles HTTP requests for:
    - `GET /stream/:streamId`: Loads state via `loadStreamState`.
    - `POST /stream/:streamId`: Saves state via `saveStreamState`.
    - `DELETE /stream/:streamId`: Deletes state via `deleteStreamState`.
    - `GET /stream/:streamId/sse`: Streams state changes via `subscribeToStateChanges`.
- **Type Dependencies:** Uses `StateChange` (local) and requires appropriate environment (`TEnv`) and state types (often from `@open-game-system/stream-kit-types`).

---

# Guide: Custom Storage & Pub/Sub Adapters

This document outlines how to integrate custom storage backends and real-time update mechanisms (pub/sub) with the `@open-game-system/stream-kit-server` package using its hook-based architecture.

## Core Abstraction: `StreamKitHooks<TEnv>`

The primary mechanism for integrating custom backends is by implementing the `StreamKitHooks<TEnv>` interface. This interface defines the contract for interacting with stream state storage and subscribing to real-time state changes.

```typescript
// Defined in @open-game-system/stream-kit-types (or inferred)
interface StateChange {
  type: 'patch' | 'snapshot';
  data: any;
  id?: string; // Optional but recommended for ordering/replaying
}

// Defined in @open-game-system/stream-kit-server
interface StreamKitHooks<TEnv> {
  /**
   * Saves the current state for a given stream ID.
   * This hook should also trigger the mechanism that notifies subscribers
   * via `subscribeToStateChanges` (e.g., publish to pub/sub, push to internal stream).
   */
  saveStreamState(params: { streamId: string; state: unknown; env: TEnv }): Promise<void>;

  /**
   * Loads the persisted state for a given stream ID.
   * Should return null if no state exists.
   */
  loadStreamState(params: { streamId: string; env: TEnv }): Promise<unknown | null>;

  /**
   * Deletes the persisted state for a given stream ID.
   */
  deleteStreamState(params: { streamId: string; env: TEnv }): Promise<void>;

  /**
   * Returns an AsyncIterable that yields StateChange objects in real-time.
   * This is used by the SSE endpoint to push updates to clients.
   * The implementation depends heavily on the backend's pub/sub capabilities.
   * The `lastEventId` can be used to potentially filter or replay historical events.
   */
  subscribeToStateChanges(params: {
    streamId: string;
    env: TEnv;
    lastEventId?: string;
  }): AsyncIterable<StateChange>;
}
```

The generic `TEnv` allows you to define a custom environment type containing the specific resources needed for your chosen backend (e.g., a database client, Durable Object context).

## Implementing Custom Adapters

To support a new backend, you create an object that implements the `StreamKitHooks<TEnv>` interface.

### Example Scenarios:

**1. Cloudflare Durable Objects (KV or SQLite)**

Durable Objects are well-suited because they colocate compute and state.

*   **Environment (`TEnv`):** Needs the DO's `DurableObjectState` (for storage access) and likely an internal mechanism (like an `eventkit` `Stream`) to broadcast changes *within* the DO instance, as DO storage itself doesn't have native pub/sub.
    ```typescript
    import { DurableObjectState } from "@cloudflare/workers-types";
    import { Stream as EventkitStream } from "@eventkit/base";

    interface MyDurableObjectEnv {
      ctx: DurableObjectState; // Access to ctx.storage or ctx.storage.sql
      internalEventStream: EventkitStream<StateChange>; // For internal broadcast
      // ... other DO env bindings
    }
    ```
*   **`saveStreamState`:**
    1.  Write the state to `env.ctx.storage` (KV) or `env.ctx.storage.sql` (SQLite).
    2.  Push a `StateChange` event onto the `env.internalEventStream`.
*   **`loadStreamState` / `deleteStreamState`:** Use the corresponding `env.ctx.storage` or `env.ctx.storage.sql` methods.
*   **`subscribeToStateChanges`:** This hook implementation should:
    1.  *(Optional)* Potentially load and yield historical state/events from storage based on `lastEventId`.
    2.  Yield events directly from the `env.internalEventStream` as they are pushed by `saveStreamState` or other internal DO logic (like alarms).
    3.  Handle cleanup when the iterable is cancelled (client disconnects).

**2. Redis (with Pub/Sub)**

Redis can handle both state storage (keys) and real-time updates (pub/sub).

*   **Environment (`TEnv`):** Needs a Redis client instance.
    ```typescript
    import { Redis } from "ioredis"; // Or your client

    interface MyRedisEnv {
      redis: Redis;
      // ... other config
    }
    ```
*   **`saveStreamState`:**
    1.  Use `SET` (or similar) to store the state in a Redis key (e.g., `stream:{streamId}:state`).
    2.  Use `PUBLISH` to send the `StateChange` event to a Redis channel (e.g., `stream:{streamId}:updates`).
*   **`loadStreamState` / `deleteStreamState`:** Use `GET`/`DEL` on the state key.
*   **`subscribeToStateChanges`:** This hook implementation should:
    1.  Create a dedicated Redis client for subscribing (`SUBSCRIBE stream:{streamId}:updates`).
    2.  Listen for messages on the channel.
    3.  Parse the message into a `StateChange` object.
    4.  *(Optional)* Filter messages based on `lastEventId` if IDs are used.
    5.  Yield the `StateChange` object.
    6.  Handle connection errors and cleanup (unsubscribe, quit client) when the iterable is cancelled.

**3. Other Backends (e.g., Postgres LISTEN/NOTIFY)**

The pattern is similar:
*   Define `TEnv` with the necessary client/context.
*   Implement `save/load/delete` using standard database operations.
*   Implement `subscribeToStateChanges` using the database's notification mechanism (`LISTEN`/`NOTIFY` for Postgres, change streams for MongoDB, etc.) to create the `AsyncIterable`.

## Using the Custom Adapter

You don't pass the adapter type as a string. Instead, you instantiate your custom hook implementation object and pass *it* to `createStreamKitRouter` during setup.

```typescript
// Example using a hypothetical Redis adapter
import { createStreamKitRouter } from "@open-game-system/stream-kit-server";
import { createRedisHooks } from "./my-redis-hooks"; // Your implementation file
import { Redis } from "ioredis";

const redisClient = new Redis(/* ... */);

// Create the specific hook implementation
const redisHooks = createRedisHooks(redisClient);

// Define the environment needed by the Redis hooks
const env: MyRedisEnv = { redis: redisClient };

// Create the router, passing the specific hooks implementation
const streamRouterHandler = createStreamKitRouter<MyRedisEnv>({
  hooks: redisHooks
});

// In your server fetch handler:
// return streamRouterHandler(request, env);
```

For Durable Objects, the hook object would typically be instantiated *inside* the DO, and the DO's `fetch` handler would invoke the relevant hook methods, passing its internal context (`this.ctx`, `this.internalEventStream`, etc.) as the `env`.

By implementing the `StreamKitHooks<TEnv>` interface for your desired backend, you can seamlessly plug it into the `stream-kit-server` router. 