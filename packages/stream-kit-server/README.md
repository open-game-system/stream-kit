# @open-game-system/stream-kit-server

Server-side implementation for the Open Game System (OGS) Cloud Rendering service.

## Overview

This package provides a router/middleware for managing headless browser instances that render game URLs and facilitate streaming their output via WebRTC. It handles:

- Session management and lifecycle
- Headless browser instance control
- WebRTC signaling and streaming
- State synchronization via Server-Sent Events (SSE)
- Input event handling
- Resource cleanup and monitoring

## Installation

```bash
npm install @open-game-system/stream-kit-server @open-game-system/stream-kit-types puppeteer fast-json-patch
# or
pnpm add @open-game-system/stream-kit-server @open-game-system/stream-kit-types puppeteer fast-json-patch
# or
yarn add @open-game-system/stream-kit-server @open-game-system/stream-kit-types puppeteer fast-json-patch
```

## Usage

### Basic Example (Express.js)

```typescript
import express from 'express';
import { createStreamKitRouter } from '@open-game-system/stream-kit-server';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Create the Stream Kit Router
const streamKitRouter = createStreamKitRouter({
  // Optional: Override Puppeteer launch options
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  // Optional: Add custom authentication/validation
  validateRequest: async (req) => {
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      return { authorized: false, error: 'Unauthorized', status: 401 };
    }
    return { authorized: true };
  }
});

// Mount the router at /stream
app.use('/stream', streamKitRouter);

server.listen(3000, () => {
  console.log('Stream Kit Server running on http://localhost:3000');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
```

### Advanced Example (with Environment & Custom Hooks)

```typescript
interface AppEnv {
  PUPPETEER_EXECUTABLE_PATH?: string;
  AUTH_SECRET: string;
  REDIS_URL: string;
}

const env: AppEnv = {
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH,
  AUTH_SECRET: process.env.AUTH_SECRET!,
  REDIS_URL: process.env.REDIS_URL!
};

const streamKitRouter = createStreamKitRouter<AppEnv>({
  // Pass environment to hooks
  getEnv: () => env,
  
  // Custom validation with caller context
  validateRequest: async (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return { authorized: false, error: 'Unauthorized', status: 401 };
    }
    const decoded = await verifyToken(token, env.AUTH_SECRET);
    return {
      authorized: true,
      callerContext: { userId: decoded.sub, role: decoded.role }
    };
  },
  
  // Custom error handling
  onError: (error, streamId) => {
    console.error(`Stream ${streamId} error:`, error);
    // Report to error tracking service
  },
  
  // Performance tuning
  stateUpdateInterval: 50, // More frequent updates (ms)
  sessionTimeout: 600000, // 10 minute timeout
});
```

## API Reference

### Router Factory

```typescript
function createStreamKitRouter<TEnv = any>(options?: {
  basePath?: string;
  puppeteerLaunchOptions?: PuppeteerLaunchOptions;
  defaultViewport?: { width: number; height: number };
  getEnv?: () => TEnv | Promise<TEnv>;
  validateRequest?: (req: Request) => Promise<{
    authorized: boolean;
    error?: string;
    status?: number;
    callerContext?: Record<string, any>;
  }>;
  stateUpdateInterval?: number;
  sessionTimeout?: number;
  onError?: (error: Error, streamId?: string) => void;
}): RequestHandler;
```

### Protocol Details

#### Session Initiation

```http
POST /stream
Content-Type: application/json
Authorization: Bearer <token>

{
  "targetUrl": "https://your-game.com/render/scene",
  "initialData": { "userId": "user-123" },
  "renderOptions": {
    "resolution": "1920x1080"
  }
}
```

Response:
```json
{
  "streamId": "uuid-generated-by-server",
  "initialState": {
    "status": "initializing",
    // ... other state fields
  }
}
```

#### State Synchronization (SSE)

```http
GET /stream/{streamId}/sse
Accept: text/event-stream
Authorization: Bearer <token>
```

Stream:
```
event: state_patch
data: [{"op": "replace", "path": "/status", "value": "streaming"}]

event: state_patch
data: [{"op": "add", "path": "/metadata/latency", "value": 75}]
```

## Related Packages

- `@open-game-system/stream-kit-web`: Core client implementation
- `@open-game-system/stream-kit-react`: React components and hooks
- `@open-game-system/stream-kit-types`: TypeScript type definitions

## License

MIT License 