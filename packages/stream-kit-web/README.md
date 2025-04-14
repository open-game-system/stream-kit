# @open-game-system/stream-kit-web

Core client implementation for the Open Game System (OGS) Cloud Rendering service.

## Overview

This package provides the foundational client-side implementation for integrating cloud-rendered streams into web applications. It handles:

- Stream session management
- WebRTC connection setup and management
- State synchronization
- Input event forwarding
- Automatic reconnection and error handling

## Installation

```bash
npm install @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
pnpm add @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
yarn add @open-game-system/stream-kit-web @open-game-system/stream-kit-types
```

## Usage

### Basic Example

```typescript
import { createStreamClient, createRenderStream } from '@open-game-system/stream-kit-web';

// Create a client instance
const client = createStreamClient({
  brokerUrl: 'https://api.opengame.org/stream',
  getAuthToken: async () => 'your-auth-token' // Optional
});

// Create a render stream instance
const stream = createRenderStream({
  client,
  url: 'https://your-game.com/render/scene',
  renderOptions: {
    resolution: '1080p',
    quality: 'high'
  },
  autoConnect: true // Start streaming immediately
});

// Subscribe to state changes
stream.subscribe((state) => {
  console.log('Stream state:', state);
});

// Get the video element to insert into your UI
const videoElement = stream.getVideoElement();
if (videoElement) {
  document.getElementById('stream-container')?.appendChild(videoElement);
}

// Send input events when needed
stream.send({
  type: 'interaction',
  data: {
    action: 'click',
    position: { x: 100, y: 200 }
  }
});

// Clean up when done
stream.destroy();
```

### Advanced Usage

#### Custom WebRTC Configuration

```typescript
const stream = createRenderStream({
  client,
  url: 'https://your-game.com/render/scene',
  renderOptions: {
    resolution: '1080p',
    quality: 'high',
    priority: 'latency'
  },
  initialData: {
    scene: 'world-1',
    playerPosition: { x: 0, y: 0, z: 0 }
  }
});

// Update stream configuration dynamically
await stream.update({
  renderOptions: {
    resolution: '720p', // Downgrade on poor connection
    quality: 'medium'
  },
  sceneData: {
    playerPosition: { x: 10, y: 0, z: 5 }
  }
});
```

#### Error Handling

```typescript
stream.subscribe((state) => {
  if (state.status === 'error') {
    console.error('Stream error:', state.errorMessage);
    if (state.errorCode === 'connection-lost') {
      // Handle reconnection
      stream.start();
    }
  }
});
```

## API Reference

### StreamClient

Low-level client for interacting with the OGS Stream API:

```typescript
interface StreamClient {
  requestStream: (params: RequestStreamParams) => Promise<StreamSession>;
  endStream: (sessionId: string) => Promise<void>;
  sendEvent: (sessionId: string, event: InputStreamEvent) => Promise<void>;
  updateStream: (sessionId: string, updates: StreamUpdates) => Promise<void>;
}
```

### RenderStream

High-level stream management interface:

```typescript
interface RenderStream {
  readonly id: string;
  readonly url: string;
  readonly state: StreamState;
  start: () => Promise<void>;
  end: () => Promise<void>;
  send: (event: InputStreamEvent) => void;
  update: (updates: StreamUpdates) => Promise<void>;
  subscribe: (listener: (state: StreamState) => void) => () => void;
  getVideoElement: () => HTMLVideoElement | null;
  destroy: () => void;
}
```

## Related Packages

- `@open-game-system/stream-kit-react`: React components and hooks
- `@open-game-system/stream-kit-types`: TypeScript type definitions
- `@open-game-system/stream-kit-server`: Server-side implementation

## License

MIT License 