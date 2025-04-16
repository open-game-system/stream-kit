import { serve } from '@hono/node-server';
import { Hono, type Context } from 'hono';
import { 
  createStreamKitRouter, 
  type StreamKitHooks, 
  type StateChange 
} from '@open-game-system/stream-kit-server';
import { Stream } from 'stream';

// --- Define App Environment & Stub Hooks ---

// Define the environment our hooks might need (if any)
// For this example, we'll use an empty object as we use in-memory storage.
interface AppEnv {}
const appEnv: AppEnv = {};

// In-memory storage for stream states (Example implementation)
const streamStates = new Map<string, unknown>();

// Simple event emitter for state changes (Example implementation)
// A real implementation might use Redis Pub/Sub, etc.
import { EventEmitter } from 'events';
const stateChangesEmitter = new EventEmitter();

const stubStreamKitHooks: StreamKitHooks<AppEnv> = {
  async saveStreamState({ streamId, state, env }) {
    console.log(`[Stub Hook] Saving state for ${streamId}`);
    streamStates.set(streamId, state);
    stateChangesEmitter.emit(`change:${streamId}`, { type: 'snapshot', data: state, id: Date.now().toString() });
  },

  async loadStreamState({ streamId, env }) {
    console.log(`[Stub Hook] Loading state for ${streamId}`);
    return streamStates.get(streamId) ?? null;
  },

  async deleteStreamState({ streamId, env }) {
    console.log(`[Stub Hook] Deleting state for ${streamId}`);
    streamStates.delete(streamId);
    stateChangesEmitter.emit(`change:${streamId}`, { type: 'snapshot', data: null, id: Date.now().toString() }); // Indicate deletion
  },

  async *subscribeToStateChanges({ streamId, env, lastEventId }){
    console.log(`[Stub Hook] Subscribing to changes for ${streamId}, lastEventId: ${lastEventId}`);
    // Yield current state immediately if requested (e.g., no lastEventId or specific logic)
    const currentState = streamStates.get(streamId);
    if (currentState && !lastEventId) { // Simple logic: send if no resume id
      yield { type: 'snapshot', data: currentState, id: Date.now().toString() };
    }

    // Create a listener function for this specific subscription
    let listener: ((change: StateChange) => void) | undefined = undefined;

    // Use a ReadableStream to handle the event emitter listener registration and cleanup
    const iterable = new ReadableStream<StateChange>({
      start(controller) {
        listener = (change) => {
          try {
            // Basic filtering example: don't send the event if its ID is <= lastEventId
            if (!lastEventId || !change.id || parseInt(change.id) > parseInt(lastEventId)) {
              controller.enqueue(change);
            } else {
              console.log(`[Stub Hook] Skipping event ${change.id} for ${streamId} due to lastEventId ${lastEventId}`);
            }
          } catch (e) {
            console.error("[Stub Hook] Error enqueuing change:", e);
            controller.error(e);
            if (listener) { // Check if listener was assigned before trying to remove
              stateChangesEmitter.off(`change:${streamId}`, listener);
            }
          }
        };
        stateChangesEmitter.on(`change:${streamId}`, listener);
        console.log(`[Stub Hook] Added listener for ${streamId}`);
      },
      cancel(reason) {
        console.log(`[Stub Hook] Subscription cancelled for ${streamId}. Reason:`, reason);
        if (listener) { // Check if listener was assigned before trying to remove
          stateChangesEmitter.off(`change:${streamId}`, listener);
          console.log(`[Stub Hook] Removed listener for ${streamId}`);
        }
      }
    });
    
    // Yield changes from the stream
    const reader = iterable.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      reader.releaseLock();
      console.log(`[Stub Hook] Finished yielding changes for ${streamId}`);
      if (listener) { // Check if listener was assigned before trying to remove
          stateChangesEmitter.off(`change:${streamId}`, listener);
          console.log(`[Stub Hook] Removed listener for ${streamId} on finally`);
        }
    }
  }
};

// --- Hono App Setup ---

const app = new Hono();
const STREAM_KIT_BASE_PATH = '/stream'; // Use the standard base path

// Create the stream kit router using the new signature with hooks
const streamKitRouterHandler = createStreamKitRouter<AppEnv>({
  hooks: stubStreamKitHooks,
});

// Remove Hono-to-Node conversion helpers

// Route ALL requests starting with the base path to the stream kit handler
app.all(`${STREAM_KIT_BASE_PATH}/*`, async (c: Context) => {
  console.log(`Forwarding request to streamKitRouterHandler: ${c.req.method} ${c.req.url}`);
  // Pass the Hono Request object and the app environment directly
  return streamKitRouterHandler(c.req.raw, appEnv);
});


// Start the server
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
console.log(`Server starting on port ${port}...`);

serve({
  fetch: app.fetch,
  port
});

// Remove legacy cleanup logic
// Cleanup should be handled within hooks if necessary (e.g., closing DB connections)
// process.on('SIGINT', cleanup);
// process.on('SIGTERM', cleanup);

console.log(`Hono server listening on port ${port}`);
console.log(`StreamKit endpoints available under ${STREAM_KIT_BASE_PATH}`);
