# OGS Integration Guide

## Intended Developer Experience

For a third-party web game inside the OGS app, the developer should ideally:

1. install `@open-game-system/stream-kit` or `@open-game-system/stream-kit-react`
2. wrap the app in an OGS provider
3. add a `CastButton`, `StreamCanvas`, or similar primitive
4. let OGS handle native bridge wiring, backend orchestration, and Cloudflare runtime management

The developer should not need to run their own Workers, TURN servers, or Cloudflare containers.

## Dependency Model

Recommended model:

- `stream-kit` depends on `app-bridge` internally
- `stream-kit` exposes the high-level developer API
- `app-bridge` remains mostly an implementation detail

That keeps the public mental model simple while still using the existing `opengame-app` bridge architecture.

## Theoretical Getting Started

### React

```tsx
import {
  OGSProvider,
  CastButton,
  StreamCanvas,
} from "@open-game-system/stream-kit-react";

export function App() {
  return (
    <OGSProvider config={{ gameId: "your-game-id", environment: "production" }}>
      <CastButton />
      <StreamCanvas route="/render/world" />
    </OGSProvider>
  );
}
```

### Non-React

```ts
import { createOGSClient } from "@open-game-system/stream-kit";

const ogs = createOGSClient({
  gameId: "your-game-id",
  environment: "production",
});

await ogs.cast.showPicker();

const stream = await ogs.streaming.createStream({
  route: "/render/world",
});

stream.mount(document.getElementById("stream-container")!);
```

## How This Should Work Under The Hood

1. `stream-kit` detects whether it is running inside `opengame-app`.
2. If available, it uses `app-bridge` to talk to the native shell.
3. For cast actions, it dispatches native bridge events rather than exposing raw bridge APIs to the game developer.
4. For cloud rendering, it calls OGS-owned APIs that provision stream sessions on OGS-owned Cloudflare infrastructure.

## Recommended Public API Shape

React surface:

- `OGSProvider`
- `CastButton`
- `StreamCanvas`
- `useCastSession()`
- `useStreamingSupport()`
- `useTVStream()`

Non-React surface:

- `createOGSClient()`
- `ogs.cast.showPicker()`
- `ogs.cast.subscribe()`
- `ogs.streaming.createStream()`
- `ogs.streaming.startTVStream()`

## What OGS Should Own

- `opengame-app`: native cast/session UX
- `opengame-api`: public control plane endpoints
- OGS Cloudflare Workers/Containers: streaming runtime

## What Is Already True In The Codebase

- `opengame-app` already exposes native cast state and `SHOW_CAST_PICKER` through `app-bridge`.
- `stream-kit` already has a working Cloudflare runtime example.
- `opengame-api` does not yet expose cast or stream control-plane endpoints.

## What Still Needs To Be Built

- a polished public `stream-kit` SDK API
- `opengame-api` stream/cast session endpoints
- a supported integration path from the OGS app to the stream runtime
- docs that distinguish current implementation from target public SDK shape
