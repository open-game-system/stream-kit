# @open-game-system/stream-kit-testing

Testing utilities for Stream Kit packages that make it easy to test stream-based applications and components.

## Installation

```bash
npm install --save-dev @open-game-system/stream-kit-testing
# or
pnpm add -D @open-game-system/stream-kit-testing
# or
yarn add -D @open-game-system/stream-kit-testing
```

## Usage

### Mock Stream Client

The mock stream client allows you to simulate stream behavior in your tests without actual WebRTC connections.

```typescript
import { createMockStreamClient } from '@open-game-system/stream-kit-testing';
import { expect, test } from 'vitest';

test('stream client handles connection lifecycle', async () => {
  const mockClient = createMockStreamClient();
  
  const stream = mockClient.createRenderStream({
    url: 'https://test.com/stream',
    renderOptions: { resolution: '1080p' }
  });

  // Test initial state
  expect(stream.state.status).toBe('initialized');

  // Start stream and verify connection
  await stream.start();
  expect(stream.state.status).toBe('connecting');
});
```

### Broker Event Simulation

Utilities to simulate broker Server-Sent Events (SSE) for stream management:

```typescript
import { simulateBrokerEvent } from '@open-game-system/stream-kit-testing';

test('handles broker peer assignment', async () => {
  const mockClient = createMockStreamClient();
  const stream = mockClient.createRenderStream({
    url: 'https://test.com/stream'
  });

  await stream.start();
  expect(stream.state.status).toBe('connecting');

  // Simulate broker assigning a peer
  simulateBrokerEvent(stream, {
    type: 'peer_assigned',
    peerId: 'render-node-1',
    connectionDetails: {
      iceServers: [{ urls: 'stun:stun.example.com' }]
    }
  });

  // Assert stream moves to connected state
  expect(stream.state.status).toBe('connected');
});

test('handles broker error scenarios', async () => {
  const mockClient = createMockStreamClient();
  const stream = mockClient.createRenderStream({
    url: 'https://test.com/stream'
  });

  await stream.start();

  // Simulate broker indicating node failure
  simulateBrokerEvent(stream, {
    type: 'node_failure',
    reason: 'render_node_crashed'
  });
  
  expect(stream.state.status).toBe('error');
  expect(stream.state.error?.code).toBe('NODE_FAILURE');
});
```

### Stream State Assertions

Helper functions to assert stream states and transitions:

```typescript
import { 
  assertStreamConnected,
  assertStreamDisconnected,
  waitForStreamState 
} from '@open-game-system/stream-kit-testing';

test('stream transitions through expected states', async () => {
  const mockClient = createMockStreamClient();
  const stream = mockClient.createRenderStream({
    url: 'https://test.com/stream'
  });

  await stream.start();
  
  // Wait for connecting state
  await waitForStreamState(stream, 'connecting');
  
  // Simulate successful peer assignment
  simulateBrokerEvent(stream, {
    type: 'peer_assigned',
    peerId: 'render-node-1',
    connectionDetails: {
      iceServers: [{ urls: 'stun:stun.example.com' }]
    }
  });
  
  // Assert connected state
  assertStreamConnected(stream);

  // Simulate stream end
  simulateBrokerEvent(stream, {
    type: 'stream_ended',
    reason: 'session_timeout'
  });
  
  assertStreamDisconnected(stream);
});
```

### Testing React Components

When using with React components (requires `@open-game-system/stream-kit-react`):

```typescript
import { render, screen } from '@testing-library/react';
import { createMockStreamClient } from '@open-game-system/stream-kit-testing';
import { StreamProvider } from '@open-game-system/stream-kit-react';

test('StreamView component renders stream correctly', () => {
  const mockClient = createMockStreamClient();

  render(
    <StreamProvider client={mockClient}>
      <StreamView url="https://test.com/stream" />
    </StreamProvider>
  );

  // Assert video element is present
  expect(screen.getByTestId('stream-video')).toBeInTheDocument();
});
```

## API Reference

### MockStreamClient

```typescript
interface MockStreamClient {
  createRenderStream: (params: CreateRenderStreamParams) => RenderStream;
}
```

### Broker Event Types

```typescript
type BrokerEvent = 
  | { type: 'peer_assigned'; peerId: string; connectionDetails: RTCConfiguration }
  | { type: 'node_failure'; reason: string }
  | { type: 'stream_ended'; reason: string }
  | { type: 'quality_change'; settings: StreamQualitySettings };

interface StreamQualitySettings {
  resolution: '720p' | '1080p' | '1440p' | '2160p';
  bitrate: number;
  fps: number;
}
```

### Assertion Functions

```typescript
function assertStreamConnected(stream: RenderStream): void;
function assertStreamDisconnected(stream: RenderStream): void;
function assertStreamError(stream: RenderStream, code?: string): void;
function waitForStreamState(stream: RenderStream, status: StreamStatus): Promise<void>;
```

### Simulation Functions

```typescript
function simulateBrokerEvent(stream: RenderStream, event: BrokerEvent): void;
```

## Contributing

Please see our [Contributing Guide](../../CONTRIBUTING.md) for details on how to contribute to this package.

## License

MIT License 