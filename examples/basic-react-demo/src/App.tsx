import React, { useState } from 'react';
import { createStreamContext } from '@open-game-system/stream-kit-react';
import { createRenderStream } from '@open-game-system/stream-kit-web';

// Create stream context
const StreamContext = createStreamContext();

// Create stream instances
const worldStream = createRenderStream({
  url: 'https://demo.opengame.org/render/world',
  renderOptions: {
    resolution: '1080p',
    quality: 'high'
  }
});

const mapStream = createRenderStream({
  url: 'https://demo.opengame.org/render/map',
  renderOptions: {
    resolution: '720p',
    quality: 'medium'
  }
});

function StreamControls() {
  const state = StreamContext.useStreamState();
  const stream = StreamContext.useStream();

  return (
    <div className="controls">
      <div className="status">
        Status: <span className={`status-${state.status}`}>{state.status}</span>
        {state.latency && <span> ({state.latency}ms)</span>}
        {state.fps && <span> @ {state.fps} FPS</span>}
      </div>
      <button
        onClick={() => stream.send({
          type: 'command',
          data: { command: 'togglePause' }
        })}
      >
        Toggle Pause
      </button>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState<'world' | 'map'>('world');
  const currentStream = activeView === 'world' ? worldStream : mapStream;

  return (
    <div className="app">
      <h1>Stream Kit Demo</h1>
      
      <div className="view-selector">
        <button
          onClick={() => setActiveView('world')}
          disabled={activeView === 'world'}
        >
          World View
        </button>
        <button
          onClick={() => setActiveView('map')}
          disabled={activeView === 'map'}
        >
          Map View
        </button>
      </div>

      <StreamContext.Provider stream={currentStream}>
        <div className="stream-container">
          <StreamContext.Canvas className="stream-canvas" />
          
          <StreamContext.Connecting>
            <div className="overlay connecting">
              Connecting to {activeView} view...
            </div>
          </StreamContext.Connecting>

          <StreamContext.Error>
            {(error) => (
              <div className="overlay error">
                Error: {error.message}
                <button onClick={() => currentStream.start()}>
                  Retry Connection
                </button>
              </div>
            )}
          </StreamContext.Error>

          <StreamContext.Streaming>
            <StreamControls />
          </StreamContext.Streaming>
        </div>
      </StreamContext.Provider>
    </div>
  );
}

export default App; 