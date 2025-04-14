import React, { createContext, useContext, useMemo, useSyncExternalStore, useEffect, useRef } from 'react';
import type { RenderStream } from '@open-game-system/stream-kit-web';
import type { StreamState } from '@open-game-system/stream-kit-types';

interface StreamContextValue {
  stream: RenderStream | null;
}

// Context to hold the RenderStream instance
const StreamInstanceContext = createContext<StreamContextValue>({ stream: null });

interface StreamProviderProps {
  stream: RenderStream;
  children: React.ReactNode;
}

/**
 * Provides a RenderStream instance to descendant components.
 */
function StreamProvider({ stream, children }: StreamProviderProps) {
  const value = useMemo(() => ({ stream }), [stream]);
  return (
    <StreamInstanceContext.Provider value={value}>
      {children}
    </StreamInstanceContext.Provider>
  );
}

/**
 * Hook to access the RenderStream instance from context.
 */
function useStreamInstance(): RenderStream {
  const context = useContext(StreamInstanceContext);
  if (!context || !context.stream) {
    throw new globalThis.Error('useStreamInstance must be used within a StreamProvider');
  }
  return context.stream;
}

/**
 * Hook to subscribe to the stream's state.
 */
function useStreamState(): StreamState {
  const stream = useStreamInstance();

  const subscribe = useMemo(() => stream.subscribe.bind(stream), [stream]);
  const getSnapshot = useMemo(() => () => stream.state, [stream]);
  const getServerSnapshot = useMemo(() => () => stream.state, [stream]); // Same for SSR/initial

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface StreamCanvasProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  // Remove comment about canvas
}

/**
 * Component that renders the video stream.
 */
function StreamCanvas(props: StreamCanvasProps) {
  const stream = useStreamInstance();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = stream.getVideoElement();
    const currentVideoRef = videoRef.current;

    if (videoElement && currentVideoRef && currentVideoRef.parentNode) {
      // Check if the video element is already the one we have
      if (currentVideoRef !== videoElement) {
        // Replace the ref's element with the one from the stream
        // This handles cases where the video element might be recreated
        currentVideoRef.parentNode.replaceChild(videoElement, currentVideoRef);
        // We might not need the ref anymore if the element is directly managed?
        // For now, we assume the stream gives us THE video element to use.
      }
    } else if (videoElement && currentVideoRef) {
      // If the ref exists but doesn't have a parent yet (initial render?)
      // And the stream provides an element, let's try attaching it.
      // This logic might need refinement based on how stream.getVideoElement behaves.
      if (currentVideoRef.parentNode) {
          // If it has a parent, replace (similar to above)
          currentVideoRef.parentNode.replaceChild(videoElement, currentVideoRef);
      } else {
          // If no parent, maybe just assign srcObject? This depends on how the stream manages the element
          // If getVideoElement *creates* it, we need to append it.
          // Let's assume for now it replaces the ref placeholder.
      }
      // If the stream manages the element, just ensure it's playing
      videoElement.play().catch((err: any) => console.error("Video play failed:", err));
    }

    // Cleanup function to potentially pause video or remove element?
    // Depends on ownership: does the stream manage the element lifecycle?
    return () => {
      // Example: Pause video on unmount if desirable
      // videoElement?.pause();
    };
  }, [stream, stream.getVideoElement()]); // Re-run if the video element instance changes

  // Render a placeholder video element
  return <video ref={videoRef} {...props} playsInline autoPlay muted />;
}

// --- State-based Components ---

interface StateComponentProps {
  children: React.ReactNode | ((payload: any) => React.ReactNode); // Allow render props
}

function Connecting({ children }: StateComponentProps) {
  const state = useStreamState();
  if (state.status !== 'connecting') return null;
  return typeof children === 'function' ? children(null) : <>{children}</>;
}

function Streaming({ children }: StateComponentProps) {
  const state = useStreamState();
  if (state.status !== 'streaming') return null;
  return typeof children === 'function' ? children(null) : <>{children}</>;
}
function Ended({ children }: StateComponentProps) {
  const state = useStreamState();
  if (state.status !== 'ended') return null;
  return typeof children === 'function' ? children(null) : <>{children}</>;
}

function StreamError({ children }: StateComponentProps) {
  const state = useStreamState();
  if (state.status !== 'error') return null;
  const error = { message: state.errorMessage }; // Create error-like object
  return typeof children === 'function' ? children(error) : <>{children}</>;
}

// Factory function to create the context object
export function createStreamContext() {
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

// Optional: Export hooks directly if preferred
// export { useStreamInstance as useStream, useStreamState }; 