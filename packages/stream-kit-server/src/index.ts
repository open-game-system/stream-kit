import type * as http from 'http';
import type * as puppeteer from 'puppeteer';
import type { Operation } from 'fast-json-patch';
import { compare } from 'fast-json-patch';
import type { StreamState } from '@open-game-system/stream-kit-types';

// Placeholder types and options based on STREAM_KIT_SERVER_README_DRAFT.md

export interface CreateStreamKitRouterOptions<TEnv = unknown> {
  basePath?: string;
  puppeteerLaunchOptions?: puppeteer.PuppeteerLaunchOptions;
  defaultViewport?: { width: number; height: number };
  getEnv?: () => TEnv | Promise<TEnv>;
  validateRequest?: (
    req: http.IncomingMessage
  ) => Promise<{
    authorized: boolean;
    error?: string;
    status?: number;
    callerContext?: Record<string, any>;
  }>;
  stateUpdateInterval?: number;
  sessionTimeout?: number;
  onError?: (error: Error, streamId?: string) => void;
}

export interface StreamKitRouter {
  (req: http.IncomingMessage, res: http.ServerResponse, next?: (err?: any) => void): Promise<void> | void;
}

// Conceptual State Shape (from README)
interface InternalStreamSessionState extends StreamState {
  streamId: string;
  targetUrl: string;
  clientConnected: boolean; // SSE connection status
  instanceInfo?: {
    pid?: number;
    startTime: number;
    viewport: { width: number; height: number };
  };
  webrtc?: {
    signalingState: 'idle' | 'negotiating' | 'connected';
    iceCandidatesGathered?: boolean;
  };
  metadata?: Record<string, any>;
  errorMessage?: string;
  lastActivityTime: number;
}

/**
 * Creates a request handler (middleware) for managing stream sessions.
 * (Implementation details TBD based on README draft)
 */
export function createStreamKitRouter<TEnv = unknown>(
  options?: CreateStreamKitRouterOptions<TEnv>
): StreamKitRouter {
  console.log('Creating Stream Kit Router with options:', options);

  const sessions = new Map<string, InternalStreamSessionState>();
  const browserInstances = new Map<string, puppeteer.Browser>(); // Manage browser instances
  const sseConnections = new Map<string, http.ServerResponse>(); // Manage SSE connections

  // Placeholder for the actual router/middleware logic
  const router: StreamKitRouter = async (req, res, next) => {
    const method = req.method?.toUpperCase();
    const url = req.url || '/';
    const streamIdMatch = url.match(/^\/(.+)\/sse$/); // Basic match for /<streamId>/sse

    console.log(`[StreamKitRouter] Received request: ${method} ${url}`);

    try {
      // --- Authentication (Example) ---
      if (options?.validateRequest) {
        const authResult = await options.validateRequest(req);
        if (!authResult.authorized) {
          res.writeHead(authResult.status || 401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: authResult.error || 'Unauthorized' }));
          return;
        }
        // Use authResult.callerContext if needed
      }

      // --- Routing Logic (Simplified) ---
      if (method === 'POST' && url === '/') {
        // --- Handle POST /stream (Session Initiation) ---
        let body = '';
        req.on('data', (chunk: Buffer | string) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { targetUrl, initialData, renderOptions } = JSON.parse(body);
            if (!targetUrl) {
              throw new Error('Missing targetUrl in request body');
            }

            const streamId = `str-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
            console.log(`[StreamKitRouter] Initiating stream ${streamId} for URL: ${targetUrl}`);

            // TODO: Launch Puppeteer instance
            // const browser = await puppeteer.launch(options?.puppeteerLaunchOptions);
            // const page = await browser.newPage();
            // await page.setViewport(options?.defaultViewport || { width: 1920, height: 1080 });
            // await page.goto(targetUrl);
            // browserInstances.set(streamId, browser);

            const initialState: InternalStreamSessionState = {
              streamId,
              status: 'initializing',
              targetUrl,
              clientConnected: false,
              metadata: initialData,
              lastActivityTime: Date.now(),
              // TODO: Populate instanceInfo, webrtc state
            };
            sessions.set(streamId, initialState);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ streamId, initialState }));

            // Simulate state progression
            setTimeout(() => {
              const current = sessions.get(streamId);
              if (current) {
                sessions.set(streamId, { ...current, clientConnected: true, lastActivityTime: Date.now() });
                sendStatePatch(streamId);
                setTimeout(() => {
                  const current2 = sessions.get(streamId);
                  if (current2) {
                    sessions.set(streamId, { ...current2, clientConnected: true, lastActivityTime: Date.now() });
                    sendStatePatch(streamId);
                  }
                }, 1000)
              }
            }, 500);

          } catch (err: any) {
            console.error('[StreamKitRouter] Error handling POST /:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'Invalid request body' }));
          }
        });

      } else if (method === 'GET' && streamIdMatch) {
        // --- Handle GET /stream/{streamId}/sse (State Synchronization) ---
        const streamId = streamIdMatch[1];
        const session = sessions.get(streamId);

        if (!session) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Stream session not found' }));
          return;
        }

        console.log(`[StreamKitRouter] Client connected to SSE for stream ${streamId}`);

        // Set up SSE headers
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
        res.write(':ok\n\n'); // Initial keep-alive comment

        sseConnections.set(streamId, res);
        sessions.set(streamId, { ...session, clientConnected: true, lastActivityTime: Date.now() });

        // Send initial state or patch if needed?
        sendStatePatch(streamId, session); // Send full state initially

        req.on('close', () => {
          console.log(`[StreamKitRouter] Client disconnected from SSE for stream ${streamId}`);
          sseConnections.delete(streamId);
          const currentSession = sessions.get(streamId);
          if (currentSession) {
            sessions.set(streamId, { ...currentSession, clientConnected: false });
          }
        });

      } else {
        // --- Handle Not Found or other methods ---
        if (next) {
          next(); // Pass to next middleware if available
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Not Found' }));
        }
      }
    } catch (err: any) {
      console.error('[StreamKitRouter] Unhandled error:', err);
      if (options?.onError) {
        options.onError(err);
      }
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }
  };

  // Function to send state patches (simplified)
  let previousStates = new Map<string, InternalStreamSessionState>();
  const sendStatePatch = (streamId: string, forceFullState?: InternalStreamSessionState) => {
    const sseRes = sseConnections.get(streamId);
    const currentState = sessions.get(streamId);

    if (!sseRes || !currentState) {
      return;
    }

    let dataToSend: any;
    let eventType = 'state_patch';

    if (forceFullState) {
        eventType = 'state_init'; // Or use a dedicated initial state event
        dataToSend = forceFullState;
        previousStates.set(streamId, forceFullState);
    } else {
        const previousState = previousStates.get(streamId);
        if (!previousState) {
            // If no previous state, send full state as initial patch
             eventType = 'state_init';
             dataToSend = currentState;
        } else {
            const patch = compare(previousState, currentState);
            if (patch.length > 0) {
                dataToSend = patch;
            } else {
                return; // No changes
            }
        }
        previousStates.set(streamId, currentState);
    }

    sseRes.write(`event: ${eventType}\n`);
    sseRes.write(`data: ${JSON.stringify(dataToSend)}\n\n`);
  };

  // --- TODO: Add interval timer for state updates and session timeouts ---
  // setInterval(() => {
  //   sessions.forEach((_, streamId) => sendStatePatch(streamId));
  // }, options?.stateUpdateInterval || 100);

  // setInterval(() => {
  //    const now = Date.now();
  //    sessions.forEach((session, streamId) => {
  //        if (now - session.lastActivityTime > (options?.sessionTimeout || 300000)) {
  //           console.log(`[StreamKitRouter] Session ${streamId} timed out.`);
  //           // TODO: Clean up browser instance, SSE connection, session data
  //        }
  //    });
  // }, 60000); // Check timeouts every minute


  return router;
} 