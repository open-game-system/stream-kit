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
    throw new Error('useStreamInstance must be used within a StreamProvider');
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

interface StreamCanvasProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

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
      if (currentVideoRef !== videoElement) {
        currentVideoRef.parentNode.replaceChild(videoElement, currentVideoRef);
      }
    }
  }, [stream]);

  return <video ref={videoRef} {...props} playsInline autoPlay muted />;
}

// --- State-based Components ---

interface StateComponentProps {
  children: React.ReactNode | ((payload: any) => React.ReactNode);
}

function Connecting({ children }: StateComponentProps): JSX.Element {
  const state = useStreamState();
  if (state.status !== 'connecting') return <></>;
  return <>{typeof children === 'function' ? children(null) : children}</>;
}

function Streaming({ children }: StateComponentProps): JSX.Element {
  const state = useStreamState();
  if (state.status !== 'streaming') return <></>;
  return <>{typeof children === 'function' ? children(null) : children}</>;
}

function Ended({ children }: StateComponentProps): JSX.Element {
  const state = useStreamState();
  if (state.status !== 'ended') return <></>;
  return <>{typeof children === 'function' ? children(null) : children}</>;
}

function StreamError({ children }: StateComponentProps): JSX.Element {
  const state = useStreamState();
  if (state.status !== 'error') return <></>;
  const error = { message: state.errorMessage }; // Create error-like object
  return <>{typeof children === 'function' ? children(error) : children}</>;
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