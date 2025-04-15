import { serve } from '@hono/node-server';
import { Hono, type Context } from 'hono';
import { createStreamKitRouter } from '@open-game-system/stream-kit-server';
import { IncomingMessage, ServerResponse } from 'http';

const app = new Hono();
const STREAM_KIT_BASE_PATH = '/api/stream-kit';

// Create the stream kit router
const streamKitRouter = createStreamKitRouter({
    peerjsHost: process.env.PEERJS_HOST,
    peerjsPort: process.env.PEERJS_PORT ? parseInt(process.env.PEERJS_PORT, 10) : undefined,
    peerjsPath: process.env.PEERJS_PATH,
    peerjsSecure: process.env.PEERJS_SECURE !== 'false',
    peerjsKey: process.env.PEERJS_KEY,
    peerjsDebugLevel: process.env.PEERJS_DEBUG ? parseInt(process.env.PEERJS_DEBUG, 10) as 0 | 1 | 2 | 3 : 0,
});

// Helper to convert Hono request to Node request
function convertRequest(c: Context): IncomingMessage {
    const req = c.req.raw;
    // Add missing properties from IncomingMessage
    Object.defineProperty(req, 'httpVersion', { value: '1.1' });
    Object.defineProperty(req, 'httpVersionMajor', { value: 1 });
    Object.defineProperty(req, 'httpVersionMinor', { value: 1 });
    Object.defineProperty(req, 'socket', { value: null });
    Object.defineProperty(req, 'connection', { value: null });
    return req as unknown as IncomingMessage;
}

// Helper to create a Node response that writes back to Hono's response
function createNodeResponse(c: Context): ServerResponse {
    const res = new ServerResponse(convertRequest(c));
    let body = '';
    let statusCode = 200;
    let headers: Record<string, string> = {};

    // Override methods to capture response data
    res.writeHead = function(code: number, responseHeaders?: any) {
        statusCode = code;
        if (responseHeaders) {
            headers = { ...headers, ...responseHeaders };
        }
        return this;
    };

    res.write = function(chunk: any) {
        if (chunk) {
            body += chunk.toString();
        }
        return true;
    };

    res.end = function(chunk?: any) {
        if (chunk) {
            body += chunk.toString();
        }
        // Set the response on the Hono context
        // Convert the status code to a valid Hono status code
        c.status(statusCode as 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500);
        Object.entries(headers).forEach(([key, value]) => {
            c.header(key, value);
        });
        c.body(body);
        return this;
    };

    return res;
}

// Mount the stream kit routes
app.post(`${STREAM_KIT_BASE_PATH}/start-stream`, async (c: Context) => {
    const nodeReq = convertRequest(c);
    const nodeRes = createNodeResponse(c);
    await streamKitRouter.handleStartStream(nodeReq, nodeRes);
    return c.res;
});

app.get(`${STREAM_KIT_BASE_PATH}/sessions`, async (c: Context) => {
    const nodeReq = convertRequest(c);
    const nodeRes = createNodeResponse(c);
    await streamKitRouter.handleGetSessions(nodeReq, nodeRes);
    return c.res;
});

app.delete(`${STREAM_KIT_BASE_PATH}/sessions/:sessionId`, async (c: Context) => {
    const sessionId = c.req.param('sessionId');
    const nodeReq = convertRequest(c);
    const nodeRes = createNodeResponse(c);
    await streamKitRouter.handleDeleteSession(nodeReq, nodeRes, sessionId);
    return c.res;
});

// Start the server
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
console.log(`Server starting on port ${port}...`);

serve({
    fetch: app.fetch,
    port
});

// Handle cleanup on shutdown
const cleanup = () => {
    console.log('Shutting down...');
    streamKitRouter.cleanup().then(() => {
        console.log('Cleanup complete');
        process.exit(0);
    }).catch((error: Error) => {
        console.error('Error during cleanup:', error);
        process.exit(1);
    });
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
