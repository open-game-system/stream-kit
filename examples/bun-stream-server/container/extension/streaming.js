/**
 * Chrome Extension Streaming Handler (streaming.js)
 * 
 * FILE STRUCTURE:
 * - background.js: Creates hidden tab with streaming.html when extension loads
 * - streaming.html: Loads PeerJS library and this streaming.js file  
 * - streaming.js: Contains INITIALIZE() function and connection tracking logic
 * 
 * HOW THE SYSTEM WORKS:
 * 
 * 1. CONTAINER STARTUP:
 *    - Container server starts Puppeteer browser with this Chrome extension
 *    - background.js creates a hidden tab loading streaming.html 
 *    - streaming.html loads peer.js (PeerJS library) and this streaming.js file
 * 
 * 2. PUPPETEER INTEGRATION:
 *    - Container server calls page.evaluate() to execute INITIALIZE() function
 *    - This function captures the current tab's video/audio stream
 *    - Creates PeerJS connection to stream to remote peer (like a receiver device)
 * 
 * 3. CONNECTION TRACKING SYSTEM:
 *    - window.activeConnections tracks all active streaming connections
 *    - Container server polls this every 15 seconds via page.evaluate()
 *    - When connections drop to 0, starts 60-second shutdown timer
 *    - If no new connections within grace period, browser shuts down automatically
 * 
 * 4. LIFECYCLE MANAGEMENT:
 *    - Browser stays alive as long as streams are active
 *    - Automatically shuts down when unused (resource efficient)
 *    - Can handle multiple simultaneous streams to different peers
 * 
 * ARCHITECTURE FLOW:
 * Stream Request → Container Server → Puppeteer → Chrome Extension → PeerJS → Remote Peer
 *                              ↘ Connection Monitoring ↙
 *                           (Polls window.activeConnections)
 * 
 * IMPORTANT NOTES:
 * - This runs in the Chrome extension context (isolated from normal web pages)
 * - Has special permissions for tab capture (see manifest.json)
 * - INITIALIZE function must be globally accessible for Puppeteer's page.evaluate()
 * - Connection tracking is critical for automatic resource management
 */

/**
 * INITIALIZE gets called within the context of the chrome extension
 * by puppeteer calling evaluate on the extension's background page (streaming.html)
 *
 * captures the active puppeteer tab into a media stream that we use
 * to call the remote peer using peerjs
 * 
 * @param {Object} params - Parameters from container server
 * @param {string} params.srcPeerId - This browser's PeerJS ID (UUID)
 * @param {string} params.destPeerId - Remote peer's PeerJS ID (receiver)
 */

// Initialize connection tracking for container server monitoring
// The container server polls this Set to determine when to shut down
console.log('[INIT] Initializing window.activeConnections Set');
window.activeConnections = new Set();

// Debug tracking that container server can read
console.log('[INIT] Initializing window.streamingDebug object');
window.streamingDebug = {
  initializeCalled: false,
  addConnectionCalled: false,
  lastPeerId: null,
  lastError: null,
  callCount: 0,
  scriptLoadTime: new Date().toISOString(),
  peerJsAvailable: typeof Peer !== 'undefined',
  chromeTabCaptureAvailable: typeof chrome !== 'undefined' && typeof chrome.tabCapture !== 'undefined'
};

console.log('[INIT] streaming.js loaded successfully');
console.log('[INIT] PeerJS available:', window.streamingDebug.peerJsAvailable);
console.log('[INIT] Chrome tabCapture available:', window.streamingDebug.chromeTabCaptureAvailable);
console.log('[INIT] Initial activeConnections size:', window.activeConnections.size);

/**
 * Add a peer connection to the tracking set
 * Container server monitors window.activeConnections.size via page.evaluate()
 */
function addConnection(peerId) {
  console.log(`[CONNECTION] Adding connection for peer: ${peerId}`);
  console.log(`[CONNECTION] activeConnections before add:`, Array.from(window.activeConnections));
  console.log(`[CONNECTION] activeConnections size before add:`, window.activeConnections.size);
  
  window.activeConnections.add(peerId);
  
  console.log(`[CONNECTION] activeConnections after add:`, Array.from(window.activeConnections));
  console.log(`[CONNECTION] activeConnections size after add:`, window.activeConnections.size);
  console.log(`[CONNECTION] Connection opened to ${peerId}. Active: ${window.activeConnections.size}`);
  
  // Update debug info
  window.streamingDebug.addConnectionCalled = true;
  window.streamingDebug.lastPeerId = peerId;
}

/**
 * Remove a peer connection from tracking set
 * When this reaches 0, container server starts shutdown grace period
 */
function removeConnection(peerId) {
  console.log(`[CONNECTION] Removing connection for peer: ${peerId}`);
  console.log(`[CONNECTION] activeConnections before remove:`, Array.from(window.activeConnections));
  console.log(`[CONNECTION] activeConnections size before remove:`, window.activeConnections.size);
  
  const wasPresent = window.activeConnections.has(peerId);
  window.activeConnections.delete(peerId);
  
  console.log(`[CONNECTION] Was peer present before removal: ${wasPresent}`);
  console.log(`[CONNECTION] activeConnections after remove:`, Array.from(window.activeConnections));
  console.log(`[CONNECTION] activeConnections size after remove:`, window.activeConnections.size);
  console.log(`[CONNECTION] Connection closed to ${peerId}. Active: ${window.activeConnections.size}`);
}

async function INITIALIZE({ srcPeerId, destPeerId }) {
  console.log(`[INITIALIZE] ========== STARTING INITIALIZATION ==========`);
  console.log(`[INITIALIZE] Function called with params:`, { srcPeerId, destPeerId });
  console.log(`[INITIALIZE] srcPeerId type: ${typeof srcPeerId}, value: "${srcPeerId}"`);
  console.log(`[INITIALIZE] destPeerId type: ${typeof destPeerId}, value: "${destPeerId}"`);
  
  // Mark that INITIALIZE was called
  window.streamingDebug.initializeCalled = true;
  window.streamingDebug.callCount++;
  window.streamingDebug.lastPeerId = destPeerId;
  window.streamingDebug.lastError = null; // Reset error state
  
  console.log(`[INITIALIZE] Updated debug info - call count: ${window.streamingDebug.callCount}`);
  console.log(`[INITIALIZE] Current activeConnections:`, Array.from(window.activeConnections));
  console.log(`[INITIALIZE] Current activeConnections size:`, window.activeConnections.size);
  
  try {
    // Capture the current tab's video and audio
    console.log(`[TAB_CAPTURE] Starting tab capture...`);
    console.log(`[TAB_CAPTURE] chrome object available:`, typeof chrome !== 'undefined');
    console.log(`[TAB_CAPTURE] chrome.tabCapture available:`, typeof chrome !== 'undefined' && typeof chrome.tabCapture !== 'undefined');
    
    const stream = await new Promise((resolve, reject) => {
      chrome.tabCapture.capture(
        { video: true, audio: true },
        (capturedStream) => {
          if (capturedStream) {
            console.log(`[TAB_CAPTURE] ✅ Successfully captured tab stream`);
            console.log(`[TAB_CAPTURE] Stream has ${capturedStream.getTracks().length} tracks`);
            capturedStream.getTracks().forEach((track, index) => {
              console.log(`[TAB_CAPTURE] Track ${index}: ${track.kind} - ${track.label} - enabled: ${track.enabled}`);
            });
            resolve(capturedStream);
          } else {
            const error = chrome.runtime.lastError;
            console.error(`[TAB_CAPTURE] ❌ Failed to capture tab`);
            console.error(`[TAB_CAPTURE] chrome.runtime.lastError:`, error);
            reject(new Error(`Failed to capture the tab: ${error ? error.message : 'Unknown error'}`));
          }
        }
      );
    });

    // Create PeerJS peer with our assigned ID
    console.log(`[PEERJS] Creating peer with ID: "${srcPeerId}"`);
    console.log(`[PEERJS] Peer constructor available:`, typeof Peer !== 'undefined');
    
    const peer = new Peer(srcPeerId);
    console.log(`[PEERJS] Peer object created:`, peer);
    
    // Wait for peer to connect to PeerJS signaling server
    console.log(`[PEERJS] Waiting for peer to connect to signaling server...`);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.error(`[PEERJS] ❌ Timeout waiting for peer to open`);
        reject(new Error('Timeout waiting for peer to connect'));
      }, 30000); // 30 second timeout
      
      peer.once('open', (id) => {
        clearTimeout(timeout);
        console.log(`[PEERJS] ✅ Connected to signaling server with ID: "${id}"`);
        console.log(`[PEERJS] Peer ID matches expected: ${id === srcPeerId}`);
        resolve();
      });
      
      peer.on('error', (error) => {
        clearTimeout(timeout);
        console.error(`[PEERJS] ❌ Peer error during connection:`, error);
        console.error(`[PEERJS] Error type: ${error.type}, message: ${error.message}`);
        reject(new Error(`Peer error: ${error.message}`));
      });
    });

    // Make the call to the destination peer and start connection tracking
    console.log(`[CALL] Starting call to destination peer: "${destPeerId}"`);
    console.log(`[CALL] Stream object for call:`, stream);
    console.log(`[CALL] Stream tracks for call:`, stream.getTracks().map(t => `${t.kind}:${t.label}`));
    
    const call = peer.call(destPeerId, stream);
    
    if (!call) {
      console.error(`[CALL] ❌ Failed to create call to ${destPeerId} - call object is null/undefined`);
      window.streamingDebug.lastError = 'Failed to create call object';
      return;
    }
    
    console.log(`[CALL] ✅ Call object created successfully:`, call);
    console.log(`[CALL] Call peer ID: "${call.peer}"`);
    console.log(`[CALL] Call type: "${call.type}"`);
    
    // Track the connection immediately since we're initiating the call
    console.log(`[CALL] Adding connection to tracking before call events...`);
    console.log(`[CALL] About to call addConnection with destPeerId: "${destPeerId}"`);
    console.log(`[CALL] activeConnections before addConnection:`, Array.from(window.activeConnections));
    
    try {
      addConnection(destPeerId);
      console.log(`[CALL] ✅ addConnection completed successfully`);
      console.log(`[CALL] activeConnections after addConnection:`, Array.from(window.activeConnections));
      console.log(`[CALL] activeConnections size after addConnection:`, window.activeConnections.size);
    } catch (error) {
      console.error(`[CALL] ❌ addConnection failed:`, error);
      window.streamingDebug.lastError = `addConnection failed: ${error.message}`;
    }
    
    // Handle call lifecycle events  
    call.on('stream', (remoteStream) => {
      console.log(`[CALL_EVENT] 'stream' event - Received remote stream from ${destPeerId}`);
      console.log(`[CALL_EVENT] Remote stream tracks:`, remoteStream.getTracks().map(t => `${t.kind}:${t.label}`));
      // Connection already tracked above, just log that it's bidirectional
    });
    
    // The 'open' event fires when the call is answered
    call.on('open', () => {
      console.log(`[CALL_EVENT] 'open' event - Call to ${destPeerId} opened successfully`);
      console.log(`[CALL_EVENT] Call is now active and streaming`);
      // Connection already tracked above, this is just confirmation
    });
    
    call.on('close', () => {
      console.log(`[CALL_EVENT] 'close' event - Call to ${destPeerId} ended`);
      removeConnection(destPeerId);
    });
    
    call.on('error', (error) => {
      console.error(`[CALL_EVENT] 'error' event - Call error with ${destPeerId}:`, error);
      console.error(`[CALL_EVENT] Error type: ${error.type}, message: ${error.message}`);
      removeConnection(destPeerId);
      window.streamingDebug.lastError = `Call error: ${error.message}`;
    });

    // Handle incoming calls (though this extension typically just calls out)
    console.log(`[PEER_EVENTS] Setting up peer event handlers...`);
    peer.on('call', (incomingCall) => {
      console.log(`[PEER_EVENT] 'call' event - Received incoming call from ${incomingCall.peer}`);
      addConnection(incomingCall.peer);
      
      // Auto-answer incoming calls with the same captured stream
      console.log(`[PEER_EVENT] Auto-answering incoming call with captured stream`);
      incomingCall.answer(stream);
      
      incomingCall.on('stream', (remoteStream) => {
        console.log(`[PEER_EVENT] Incoming call 'stream' event - received remote stream from ${incomingCall.peer}`);
      });
      
      incomingCall.on('close', () => {
        console.log(`[PEER_EVENT] Incoming call 'close' event - call from ${incomingCall.peer} ended`);
        removeConnection(incomingCall.peer);
      });

      incomingCall.on('error', (error) => {
        console.error(`[PEER_EVENT] Incoming call 'error' event - error from ${incomingCall.peer}:`, error);
        removeConnection(incomingCall.peer);
      });
    });

    // Handle peer-level events
    peer.on('disconnected', () => {
      console.log('[PEER_EVENT] Peer disconnected from signaling server');
      console.log('[PEER_EVENT] Note: existing calls may still be active');
    });

    peer.on('close', () => {
      console.log('[PEER_EVENT] Peer connection closed completely');
      console.log('[PEER_EVENT] Clearing all tracked connections');
      console.log('[PEER_EVENT] activeConnections before clear:', Array.from(window.activeConnections));
      window.activeConnections.clear();
      console.log('[PEER_EVENT] activeConnections after clear:', Array.from(window.activeConnections));
    });

    console.log(`[INITIALIZE] ✅ Initialization complete. Ready for streaming.`);
    console.log(`[INITIALIZE] Final activeConnections:`, Array.from(window.activeConnections));
    console.log(`[INITIALIZE] Final activeConnections size:`, window.activeConnections.size);
    console.log(`[INITIALIZE] ========== INITIALIZATION COMPLETE ==========`);
    
  } catch (error) {
    console.error(`[INITIALIZE] ❌ INITIALIZATION FAILED:`, error);
    console.error(`[INITIALIZE] Error stack:`, error.stack);
    window.streamingDebug.lastError = `Initialization failed: ${error.message}`;
    throw error; // Re-throw so container server knows it failed
  }
}

// Log when the script finishes loading
console.log('[INIT] streaming.js script execution complete');
console.log('[INIT] INITIALIZE function available:', typeof INITIALIZE === 'function');
console.log('[INIT] Global objects available:', {
  Peer: typeof Peer !== 'undefined',
  chrome: typeof chrome !== 'undefined',
  'chrome.tabCapture': typeof chrome !== 'undefined' && typeof chrome.tabCapture !== 'undefined'
});
