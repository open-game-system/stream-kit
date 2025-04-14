# @open-game-system/stream-kit-types

Core type definitions for the Open Game System (OGS) Cloud Rendering service (`stream-kit`).

## Overview

This package provides TypeScript type definitions used across the `stream-kit` ecosystem. It defines the core interfaces and types for:

- Stream configuration and options
- State management and events
- WebRTC signaling and connection management
- Server-side session state
- JSON patch operations for state synchronization

## Installation

```bash
npm install @open-game-system/stream-kit-types
# or
pnpm add @open-game-system/stream-kit-types
# or
yarn add @open-game-system/stream-kit-types
```

## Key Types

### RenderOptions

Configuration options for stream quality and behavior:

```typescript
interface RenderOptions {
  resolution?: "720p" | "1080p" | "1440p" | "4k" | string;
  targetFps?: number;
  quality?: "low" | "medium" | "high" | "ultra";
  priority?: "latency" | "quality";
  region?: string;
}
```

### StreamState

Real-time state of a streaming session:

```typescript
interface StreamState {
  status: "initializing" | "connecting" | "streaming" | "reconnecting" | "error" | "ended";
  latency?: number;
  resolution?: string;
  fps?: number;
  bitrate?: number;
  errorMessage?: string;
  errorCode?: string;
}
```

### StreamEvent & InputStreamEvent

Event structures for client-server communication:

```typescript
interface StreamEvent {
  type: string;
  payload?: any;
}

type InputStreamEvent = StreamEvent & {
  type: "interaction" | "command";
  data: {
    action?: string;
    position?: { x: number; y: number };
    // ... other properties
  };
};
```

## Usage

Import types as needed in your TypeScript code:

```typescript
import type { 
  RenderOptions, 
  StreamState, 
  StreamEvent 
} from '@open-game-system/stream-kit-types';

function configureStream(options: RenderOptions) {
  // Your implementation
}

function handleStateChange(state: StreamState) {
  // Your implementation
}
```

## Related Packages

- `@open-game-system/stream-kit-web`: Core client implementation
- `@open-game-system/stream-kit-react`: React components and hooks
- `@open-game-system/stream-kit-server`: Server-side implementation

## License

MIT License 