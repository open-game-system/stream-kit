# @open-game-system/stream-kit-react

React bindings for the Open Game System (OGS) Cloud Rendering service.

## Overview

This package provides React components, hooks, and context providers for integrating cloud-rendered streams into your React applications. It wraps the core functionality from `@open-game-system/stream-kit-web` in a React-friendly API.

## Installation

```bash
npm install @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
pnpm add @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
yarn add @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { createStreamContext } from '@open-game-system/stream-kit-react';
import { createStreamClient } from '@open-game-system/stream-kit-web';

// Create a context for your stream
const StreamContext = createStreamContext();

// Create a client instance
const client = createStreamClient({
  brokerUrl: 'https://your-game.com/stream'
});

// Create a stream instance
const worldStream = client.createRenderStream({
  url: 'https://your-game.com/render/world-view'
});

function WorldView() {
  return (
    <StreamContext.Provider stream={worldStream}>
      <div className="relative w-full h-[480px] bg-gray-900">
        {/* Canvas renders the video stream */}
        <StreamContext.Canvas className="w-full h-full" />

        {/* Show loading state */}
        <StreamContext.Connecting>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            Connecting...
          </div>
        </StreamContext.Connecting>

        {/* Show errors */}
        <StreamContext.Error>
          {(error) => (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 text-white">
              Error: {error.message}
            </div>
          )}
        </StreamContext.Error>
      </div>
    </StreamContext.Provider>
  );
}
```

### Multiple Views Example

```tsx
import React, { useState } from 'react';
import { createStreamContext } from '@open-game-system/stream-kit-react';
import { createStreamClient } from '@open-game-system/stream-kit-web';

const StreamContext = createStreamContext();

const client = createStreamClient({
  brokerUrl: 'https://your-game.com/stream'
});

const worldStream = client.createRenderStream({
  url: 'https://your-game.com/render/world-view'
});

const mapStream = client.createRenderStream({
  url: 'https://your-game.com/render/map-view'
});

function GameWithMultipleViews() {
  const [activeView, setActiveView] = useState('world');
  
  return (
    <div>
      <div className="controls">
        <button onClick={() => setActiveView('world')} disabled={activeView === 'world'}>
          World View
        </button>
        <button onClick={() => setActiveView('map')} disabled={activeView === 'map'}>
          Map View
        </button>
      </div>
      
      {activeView === 'world' ? (
        <StreamContext.Provider stream={worldStream}>
          <StreamContext.Canvas className="w-full h-[480px]" />
          <StreamContext.Connecting>Loading world view...</StreamContext.Connecting>
        </StreamContext.Provider>
      ) : (
        <StreamContext.Provider stream={mapStream}>
          <StreamContext.Canvas className="w-full h-[480px]" />
          <StreamContext.Connecting>Loading map view...</StreamContext.Connecting>
        </StreamContext.Provider>
      )}
    </div>
  );
}
```

### Using Hooks

```tsx
import { useStreamState, useStreamInstance } from '@open-game-system/stream-kit-react';

function StreamControls() {
  const stream = useStreamInstance();
  const state = useStreamState();
  
  return (
    <div>
      <div>Status: {state.status}</div>
      {state.latency && <div>Latency: {state.latency}ms</div>}
      {state.fps && <div>FPS: {state.fps}</div>}
      
      <button onClick={() => stream.send({
        type: 'command',
        data: { command: 'togglePause' }
      })}>
        Toggle Pause
      </button>
    </div>
  );
}
```

## API Reference

### Context Factory

```typescript
function createStreamContext() {
  return {
    Provider: StreamProvider,
    Canvas: StreamCanvas,
    Connecting: Connecting,
    Streaming: Streaming,
    Ended: Ended,
    Error: StreamError,
    useStream: useStreamInstance,
    useStreamState: useStreamState
  };
}
```

### Components

- `StreamProvider`: Context provider that makes a stream instance available to children
- `Canvas`: Renders the video stream
- `Connecting`: Renders children while stream is connecting
- `Streaming`: Renders children while stream is active
- `Ended`: Renders children when stream has ended
- `Error`: Renders children (with error details) when stream encounters an error

### Hooks

- `useStreamInstance()`: Get the current stream instance
- `useStreamState()`: Get the current stream state

## Related Packages

- `@open-game-system/stream-kit-web`: Core client implementation
- `@open-game-system/stream-kit-types`: TypeScript type definitions
- `@open-game-system/stream-kit-server`: Server-side implementation

## License

MIT License 