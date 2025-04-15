# @open-game-system/stream-kit-react

React components for displaying WebRTC streams from the Open Game System (OGS) Cloud Rendering service.

## Overview

This package provides React components for integrating cloud-rendered streams into your React applications.

## Installation

```bash
npm install @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
pnpm add @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
# or
yarn add @open-game-system/stream-kit-react @open-game-system/stream-kit-web @open-game-system/stream-kit-types
```

## Basic Usage

```tsx
import { StreamProvider, StreamCanvas } from '@open-game-system/stream-kit-react';
import { createStreamClient } from '@open-game-system/stream-kit-web';

// Create the client
const client = createStreamClient({
  brokerUrl: 'https://opengame.tv/stream'
});

function App() {
  return (
    <StreamProvider client={client}>
      <div className="stream-container">
        {/* Render the video stream */}
        <StreamCanvas 
          url="http://localhost:3001/world"
          className="stream-canvas" 
        />
      </div>
    </StreamProvider>
  );
}
```

## Components

### StreamProvider

Root provider component that manages the stream client:

```tsx
<StreamProvider client={client}>
  {/* Your app */}
</StreamProvider>
```

### StreamCanvas

Component that renders the video stream:

```tsx
<StreamCanvas 
  url="http://localhost:3001/world"
  className="stream-video"
  style={{ width: '100%', height: '100%' }}
  renderOptions={{
    resolution: '1080p',
    quality: 'high'
  }}
  onStateChange={(state) => {
    console.log('Stream state:', state);
  }}
/>
```

## Testing

The `@open-game-system/stream-kit-testing` package provides a mock client that allows you to simulate stream states and events:

```tsx
import { render, screen } from '@testing-library/react';
import { createMockStreamClient } from '@open-game-system/stream-kit-testing';

describe('Stream Components', () => {
  it('handles stream state changes', async () => {
    const mockClient = createMockStreamClient();
    const onStateChange = vi.fn();

    render(
      <StreamProvider client={mockClient}>
        <StreamCanvas 
          url="http://test.com/stream"
          onStateChange={onStateChange} 
        />
      </StreamProvider>
    );

    // Initial state should be connecting
    expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({
      status: 'connecting'
    }));

    // Simulate successful connection
    await mockClient.simulateStreamState({
      status: 'streaming',
      fps: 60,
      latency: 50
    });

    // Should update with new state
    expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({
      status: 'streaming',
      fps: 60,
      latency: 50
    }));

    // Simulate error
    await mockClient.simulateStreamState({
      status: 'error',
      error: new Error('Connection lost')
    });

    expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({
      status: 'error',
      error: expect.any(Error)
    }));
  });

  it('handles stream events', async () => {
    const mockClient = createMockStreamClient();
    
    const { container } = render(
      <StreamProvider client={mockClient}>
        <StreamCanvas 
          url="http://test.com/stream"
          onEvent={(event) => {
            if (event.type === 'click') {
              container.querySelector('.overlay')?.classList.add('clicked');
            }
          }}
        />
      </StreamProvider>
    );

    // Simulate stream starting
    await mockClient.simulateStreamState({ status: 'streaming' });

    // Simulate receiving a click event from the stream
    await mockClient.simulateStreamEvent({
      type: 'click',
      position: { x: 100, y: 100 }
    });

    expect(container.querySelector('.overlay.clicked')).toBeInTheDocument();
  });

  it('handles stream quality changes', async () => {
    const mockClient = createMockStreamClient();
    const onQualityChange = vi.fn();

    render(
      <StreamProvider client={mockClient}>
        <StreamCanvas 
          url="http://test.com/stream"
          onQualityChange={onQualityChange}
          renderOptions={{
            resolution: '1080p',
            quality: 'high'
          }}
        />
      </StreamProvider>
    );

    // Simulate quality degradation
    await mockClient.simulateStreamQuality({
      resolution: '720p',
      quality: 'medium',
      reason: 'bandwidth'
    });

    expect(onQualityChange).toHaveBeenCalledWith({
      resolution: '720p',
      quality: 'medium',
      reason: 'bandwidth'
    });
  });
});
```

The mock client provides several methods for testing:

- `simulateStreamState(state)`: Change the stream's state (connecting, streaming, error, etc.)
- `simulateStreamEvent(event)`: Simulate receiving an event from the stream
- `simulateStreamQuality(quality)`: Simulate stream quality changes
- `simulateDisconnect()`: Simulate unexpected disconnection
- `simulateReconnect()`: Simulate successful reconnection

This allows you to test all aspects of your stream integration, including:
- State transitions
- Event handling
- Quality adaptations
- Error scenarios
- Reconnection logic

## Examples

### Multiple Views

```tsx
function GameWithMultipleViews() {
  return (
    <StreamProvider client={client}>
      <div className="views">
        <StreamCanvas 
          url="http://localhost:3001/world"
          className="world-view"
        />
        <StreamCanvas 
          url="http://localhost:3001/map"
          className="map-view"
          renderOptions={{ resolution: '720p' }}
        />
      </div>
    </StreamProvider>
  );
}
```

### With Loading States

```tsx
function StreamWithStates() {
  return (
    <StreamProvider client={client}>
      <div className="stream-container">
        <StreamCanvas 
          url="http://localhost:3001/world"
          className="stream-canvas"
          onStateChange={(state) => {
            if (state.status === 'connecting') {
              // Show loading UI
            } else if (state.status === 'streaming') {
              // Show connected UI
            } else if (state.status === 'error') {
              // Show error UI
            }
          }}
        />
      </div>
    </StreamProvider>
  );
}
```

## Best Practices

1. Use a single `StreamProvider` at the root of your app
2. Each `StreamCanvas` manages its own stream instance
3. Handle stream states via the `onStateChange` prop
4. Use the testing utilities for reliable tests

## TypeScript Support

All components are fully typed. The stream state types are inherited from `@open-game-system/stream-kit-types`.

## License

MIT License 