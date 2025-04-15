import { useState, useEffect } from 'react';
import { createStreamClient } from '@open-game-system/stream-kit-web';
import type { RenderOptions, StreamSession } from '@open-game-system/stream-kit-types';


// Create a client instance
const client = createStreamClient({
  brokerUrl: 'https://opengame.tv/stream'
});

// Define render options
const worldRenderOptions: RenderOptions = {
  resolution: '1080p',
  quality: 'high',
  targetFps: 60
};

const mapRenderOptions: RenderOptions = {
  resolution: '720p',
  quality: 'medium',
  targetFps: 30
};

// Component to show stream controls

// Main App component
export default function App() {
  const [activeView, setActiveView] = useState<'world' | 'map'>('world');
  const [worldSession, setWorldSession] = useState<StreamSession | null>(null);
  const [mapSession, setMapSession] = useState<StreamSession | null>(null);

  useEffect(() => {
    async function initializeStreams() {
      try {
        const worldSession = await client.requestStream({
          renderUrl: 'http://localhost:3001/world',
          renderOptions: worldRenderOptions
        });

        const mapSession = await client.requestStream({
          renderUrl: 'http://localhost:3001/map',
          renderOptions: mapRenderOptions
        });

        setWorldSession(worldSession);
        setMapSession(mapSession);
      } catch (error) {
        console.error('Failed to initialize streams:', error);
      }
    }

    initializeStreams();

    return () => {
      if (worldSession) {
        client.endStream(worldSession.sessionId);
      }
      if (mapSession) {
        client.endStream(mapSession.sessionId);
      }
    };
  }, []);

  const activeSession = activeView === 'world' ? worldSession : mapSession;

  if (!activeSession) {
    return <div>Initializing streams...</div>;
  }

  return (
    <div>
      <h1>Stream Kit Demo</h1>
      <div>
        <button onClick={() => setActiveView('world')}>World View</button>
        <button onClick={() => setActiveView('map')}>Map View</button>
      </div>

      <div>
        {activeSession.status === 'connecting' && (
          <div>Connecting to stream...</div>
        )}
        
        {activeSession.status === 'error' && (
          <div>
            Error: {activeSession.error}
            <button onClick={() => {
              client.requestStream({
                renderUrl: activeView === 'world' ? 'http://localhost:3001/world' : 'http://localhost:3001/map',
                renderOptions: activeView === 'world' ? worldRenderOptions : mapRenderOptions
              }).then(session => {
                if (activeView === 'world') {
                  setWorldSession(session);
                } else {
                  setMapSession(session);
                }
              });
            }}>Retry</button>
          </div>
        )}
        
        {activeSession.status === 'streaming' && (
          <div data-testid={`${activeView}-view`}>
            <video
              ref={(el) => {
                if (el && activeSession.signalingUrl) {
                  // Set up WebRTC connection here
                  el.srcObject = new MediaStream();
                  el.play();
                }
              }}
              style={{ width: '100%', height: '100%' }}
              playsInline
              autoPlay
              muted
            />
          </div>
        )}
      </div>
    </div>
  );
} 