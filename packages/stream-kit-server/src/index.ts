import { Browser, Page } from 'puppeteer';
import { Stream, launch, getStream } from 'puppeteer-stream';
import { Peer, MediaConnection } from 'peerjs';
import type { StreamState } from "@open-game-system/stream-kit-types";
import { compare } from "fast-json-patch";
import type { IncomingMessage, ServerResponse } from "http";
import type * as puppeteer from "puppeteer";
import { EventEmitter } from 'events';

// Placeholder types and options based on STREAM_KIT_SERVER_README_DRAFT.md

interface CreateStreamKitRouterOptions {
  puppeteerLaunchOptions?: puppeteer.LaunchOptions;
  defaultViewport?: { width: number; height: number };
  validateRequest?: (req: IncomingMessage) => Promise<{
    authorized: boolean;
    error?: string;
    status?: number;
    callerContext?: Record<string, any>;
  }>;
  sessionTimeout?: number;
  onError?: (error: Error, sessionId?: string) => void;
  peerjsHost?: string;
  peerjsPort?: number;
  peerjsPath?: string;
  peerjsSecure?: boolean;
  peerjsKey?: string;
  peerjsDebugLevel?: 0 | 1 | 2 | 3;
}

interface StartStreamPayload {
  gameUrl: string;
  sessionId: string;
}

interface ActiveSession {
  browser: Browser;
  page: Page;
  inputStream: Stream;
  peer: Peer;
  state: StreamState;
  mediaConnection: MediaConnection | null;
  lastActivityTime: number;
  cleanupTimer: NodeJS.Timeout | null;
  cleanup: (reason?: string) => Promise<void>;
}

type PeerJsOptions = Pick<
  CreateStreamKitRouterOptions,
  | "peerjsHost"
  | "peerjsPort"
  | "peerjsPath"
  | "peerjsSecure"
  | "peerjsKey"
  | "peerjsDebugLevel"
> & {
  host?: string;
  port?: number;
  path?: string;
  secure?: boolean;
  key?: string;
  debug?: 0 | 1 | 2 | 3;
};

interface LegacyStreamKitRouter {
  handleStartStream: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  handleGetSessions: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  handleDeleteSession: (req: IncomingMessage, res: ServerResponse, sessionId: string) => Promise<void>;
  cleanup: () => Promise<void>;
}

// --- Router Creation Function ---

/**
 * LEGACY: Creates a framework-agnostic router for managing WebRTC streaming sessions
 * using Puppeteer and in-memory session management.
 * @deprecated Use the new hook-based `createStreamKitRouter` instead.
 */
function createLegacyStreamKitRouter(
  options: CreateStreamKitRouterOptions = {}
): LegacyStreamKitRouter {
  const {
    sessionTimeout = 300000,
    puppeteerLaunchOptions = {},
    defaultViewport = { width: 1920, height: 1080 },
    peerjsHost = process.env.PEERJS_HOST,
    peerjsPort = process.env.PEERJS_PORT
      ? parseInt(process.env.PEERJS_PORT, 10)
      : undefined,
    peerjsPath = process.env.PEERJS_PATH,
    peerjsSecure = process.env.PEERJS_SECURE !== "false",
    peerjsKey = process.env.PEERJS_KEY,
    peerjsDebugLevel = process.env.PEERJS_DEBUG
      ? (parseInt(process.env.PEERJS_DEBUG, 10) as 0 | 1 | 2 | 3)
      : 0,
    onError = (err, sid) => {
      console.error(`[StreamKit Error] Session: ${sid}, Error: ${err.message}`);
    },
  } = options;

  // In-memory store for active sessions
  const activeSessions = new Map<string, ActiveSession>();

  // Cleanup function
  const cleanupSession = async (sid: string, reason: string = "unknown") => {
    const session = activeSessions.get(sid);
    if (!session) return;

    console.log(`[${sid}] Cleaning up session due to: ${reason}`);
    activeSessions.delete(sid);

    if (session.cleanupTimer) {
      clearTimeout(session.cleanupTimer);
    }

    if (session.mediaConnection?.open) {
      try {
        console.log(`[${sid}] Closing media connection...`);
        session.mediaConnection.close();
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)), sid);
      }
    }

    if (session.peer && !session.peer.destroyed) {
      try {
        console.log(`[${sid}] Destroying peer...`);
        session.peer.destroy();
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)), sid);
      }
    }

    if (session.inputStream) {
      try {
        console.log(`[${sid}] Destroying input stream...`);
        session.inputStream.destroy();
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)), sid);
      }
    }

    if (session.page && !session.page.isClosed()) {
      try {
        console.log(`[${sid}] Closing page...`);
        await session.page.close();
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)), sid);
      }
    }

    if (session.browser && session.browser.isConnected()) {
      try {
        console.log(`[${sid}] Closing browser...`);
        await session.browser.close();
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)), sid);
      }
    }
  };

  // Helper to read JSON body
  const readJsonBody = async (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      req.on("error", reject);
    });
  };

  // Helper to send JSON response
  const sendJson = (
    res: ServerResponse,
    data: any,
    status: number = 200
  ) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  return {
    handleStartStream: async (
      req: IncomingMessage,
      res: ServerResponse
    ) => {
      try {
        if (options.validateRequest) {
          const authResult = await options.validateRequest(req);
          if (!authResult.authorized) {
            return sendJson(
              res,
              { error: authResult.error || "Unauthorized" },
              authResult.status || 401
            );
          }
        }

        const payload = (await readJsonBody(req)) as StartStreamPayload;
        const { gameUrl, sessionId } = payload;

        if (!gameUrl || !sessionId) {
          return sendJson(res, { error: "Missing gameUrl or sessionId" }, 400);
        }

        if (activeSessions.has(sessionId)) {
          return sendJson(res, { error: "Session ID already active" }, 409);
        }

        // Launch browser and set up streaming
        const browser = await launch({
          ...puppeteerLaunchOptions,
          defaultViewport,
        });

        if (!browser) {
          throw new Error("Failed to launch browser");
        }

        const page = await browser.newPage();

        if (!page) {
          await browser.close();
          throw new Error("Failed to create new page");
        }

        await page.goto(gameUrl, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        await page.evaluate(() => {
          document.querySelectorAll("video,audio").forEach((elem: Element) => {
            if (elem instanceof HTMLMediaElement) {
              elem.muted = true;
            }
          });
        });

        const stream = await getStream(page, {
          audio: true,
          video: true,
          videoConstraints: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            frameRate: { ideal: 60, min: 10 },
          },
        });

        if (!stream) {
          await page.close();
          await browser.close();
          throw new Error("Failed to get media stream");
        }

        const inputStream = stream as unknown as Stream;

        const peer = new Peer(sessionId, {
          host: peerjsHost,
          port: peerjsPort,
          path: peerjsPath,
          secure: peerjsSecure,
          key: peerjsKey,
          debug: peerjsDebugLevel,
        });

        const session: ActiveSession = {
          browser,
          page,
          inputStream,
          peer,
          state: { status: "initializing" },
          mediaConnection: null,
          lastActivityTime: Date.now(),
          cleanupTimer: null,
          cleanup: async (reason?: string) => {
            await cleanupSession(sessionId, reason);
          },
        };

        activeSessions.set(sessionId, session);

        // Set up event handlers
        page.on("close", () => cleanupSession(sessionId, "Page closed"));
        page.on("error", (err: Error) =>
          cleanupSession(sessionId, `Page error: ${err.message}`)
        );
        page.on("crash", () => cleanupSession(sessionId, "Page crashed"));

        inputStream.on("close", () =>
          cleanupSession(sessionId, "Input stream closed")
        );
        inputStream.on("error", (err: Error) =>
          cleanupSession(sessionId, `Input stream error: ${err.message}`)
        );

        peer.on("call", (mediaConnection: MediaConnection) => {
          const session = activeSessions.get(sessionId);
          if (!session) return;

          console.log(
            `[${sessionId}] Incoming call from ${mediaConnection.peer}`
          );
          session.mediaConnection = mediaConnection;
          mediaConnection.answer(inputStream as unknown as MediaStream);

          mediaConnection.on("close", () => {
            console.log(`[${sessionId}] Media connection closed`);
            if (session.mediaConnection === mediaConnection) {
              session.mediaConnection = null;
            }
          });

          mediaConnection.on("error", (err: Error) => {
            console.error(`[${sessionId}] Media connection error:`, err);
            if (session.mediaConnection === mediaConnection) {
              session.mediaConnection = null;
            }
          });
        });

        peer.on("error", (err: Error & { type?: string }) => {
          onError(err, sessionId);
          if (err.type !== "peer-unavailable") {
            cleanupSession(sessionId, `PeerJS error: ${err.message}`);
          }
        });

        peer.on("disconnected", () => {
          console.log(
            `[${sessionId}] PeerJS disconnected. Will attempt reconnect.`
          );
        });

        peer.on("close", () => {
          console.log(`[${sessionId}] PeerJS connection closed.`);
          cleanupSession(sessionId, "PeerJS connection closed");
        });

        sendJson(res, { status: "ok", sessionId });
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
        sendJson(res, { error: "Internal server error" }, 500);
      }
    },

    handleGetSessions: async (
      req: IncomingMessage,
      res: ServerResponse
    ) => {
      try {
        if (options.validateRequest) {
          const authResult = await options.validateRequest(req);
          if (!authResult.authorized) {
            return sendJson(
              res,
              { error: authResult.error || "Unauthorized" },
              authResult.status || 401
            );
          }
        }

        const sessions = Array.from(activeSessions.keys());
        sendJson(res, { sessions });
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
        sendJson(res, { error: "Internal server error" }, 500);
      }
    },

    handleDeleteSession: async (
      req: IncomingMessage,
      res: ServerResponse,
      sessionId: string
    ) => {
      try {
        if (options.validateRequest) {
          const authResult = await options.validateRequest(req);
          if (!authResult.authorized) {
            return sendJson(
              res,
              { error: authResult.error || "Unauthorized" },
              authResult.status || 401
            );
          }
        }

        if (!activeSessions.has(sessionId)) {
          return sendJson(res, { error: "Session not found" }, 404);
        }

        await cleanupSession(sessionId, "Manual deletion requested");
        sendJson(res, { status: "ok" });
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
        sendJson(res, { error: "Internal server error" }, 500);
      }
    },

    cleanup: async () => {
      const sessions = Array.from(activeSessions.keys());
      await Promise.all(
        sessions.map((sid) => cleanupSession(sid, "Server shutdown"))
      );
    },
  };
}

const defaultStreamOptions = {
  audio: true,
  video: {
    width: { min: 1280, ideal: 1920, max: 1920 },
    height: { min: 720, ideal: 1080, max: 1080 },
    frameRate: { ideal: 60 },
  },
};

// Export legacy components (renamed)
export type { CreateStreamKitRouterOptions, LegacyStreamKitRouter, ActiveSession };
export { createLegacyStreamKitRouter };

// Export the new hook-based router components
export type { StreamKitHooks } from "./types";
export { createStreamKitRouter } from "./router";

export * from './types';
export * from './router';
