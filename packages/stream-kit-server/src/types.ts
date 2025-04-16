/**
 * Defines the required hooks for customizing stream-kit-server's storage
 * and behavior. Implementations of these hooks are provided by the user to integrate
 * with their specific backend (e.g., KV, D1, R2, custom DB).
 *
 * @template TEnv The environment type, containing necessary bindings like storage namespaces.
 */

export interface StateChange {
  type: 'patch' | 'snapshot';
  data: unknown;
  id?: string; // Event ID for resuming SSE connections
}

export interface StreamKitHooks<TEnv> {
  /**
   * Saves the current state of a specific stream.
   *
   * @param params Contains streamId, the state object (type unknown, validate/cast in implementation), and environment bindings.
   * @returns Promise that resolves when the state is saved.
   */
  saveStreamState: (params: {
    streamId: string;
    state: unknown;
    env: TEnv;
  }) => Promise<void>;

  /**
   * Loads the current state of a specific stream.
   *
   * @param params Contains streamId and environment bindings.
   * @returns Promise that resolves with the stream state (type unknown, validate/cast upon use), or null if not found.
   */
  loadStreamState: (params: {
    streamId: string;
    env: TEnv;
  }) => Promise<unknown | null>;

  /**
   * Deletes the state and any associated resources for a specific stream.
   *
   * @param params Contains streamId and environment bindings.
   * @returns Promise that resolves when the stream is deleted.
   */
  deleteStreamState: (params: {
    streamId: string;
    env: TEnv;
  }) => Promise<void>;

  /**
   * Subscribe to state changes for a specific stream.
   * Used for SSE to stream state changes to clients.
   * 
   * @param params Contains streamId, environment bindings, and last event ID for resuming.
   * @returns AsyncIterable that yields state changes (full snapshots or patches).
   */
  subscribeToStateChanges: (params: {
    streamId: string;
    env: TEnv;
    lastEventId?: string;
  }) => AsyncIterable<StateChange>;
}

// TODO: Import or define StreamState from @open-game-system/stream-kit-types
// export type StreamState = { /* ... structure of your stream state ... */ };
// export type StreamMetadata = { /* ... structure of your stream metadata ... */ }; 