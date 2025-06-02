/**
 * Stream Container Server
 * 
 * This server manages a single browser instance with Puppeteer and monitors
 * active WebRTC connections to automatically shut down when no longer needed.
 * 
 * Connection Monitoring Strategy:
 * - Chrome extension maintains window.activeConnections Set with peer IDs
 * - Container server polls this state every 15 seconds via page.evaluate()
 * - When connections drop to 0, starts 60-second grace period
 * - If no connections return within grace period, shuts down browser
 * - If new connections appear during grace period, cancels shutdown
 * 
 * Browser Lifecycle:
 * - Browser launches on first /start-stream request
 * - Stays alive as long as connections are active
 * - Automatically shuts down after grace period with no connections
 * - Can be manually restarted with new /start-stream requests
 */

import puppeteer from 'puppeteer-core';
import type { Browser, Page } from 'puppeteer-core';
import crypto from 'crypto';

// TypeScript declaration for browser window extensions
declare global {
  interface Window {
    activeConnections?: Set<string>;
    streamingDebug?: {
      initializeCalled: boolean;
      addConnectionCalled: boolean;
      lastPeerId: string | null;
      lastError: string | null;
      callCount: number;
    };
    INITIALIZE?: (params: { srcPeerId: string; destPeerId: string }) => Promise<void>;
  }
}

const EXTENSION_PATH = './extension';
const EXTENSION_ID = 'jjndjgheafjngoipoacpjgeicjeomjli';

// Connection monitoring configuration
const GRACE_PERIOD_MS = 60000; // 60 seconds
const POLL_INTERVAL_MS = 15000; // 15 seconds

// Module-level state for persistent browser instance
let browser: Browser | undefined;
let activePage: Page | undefined;
let streamingPage: Page | undefined;
let connectionCheckInterval: Timer | null = null;
let shutdownTimer: Timer | null = null;

/** Utility: Create JSON response */
function jsonResponse(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...(init.headers || {}) 
    },
    ...init,
  });
}

/** Build Puppeteer launch options */
function buildLaunchOptions() {
  return {
    headless: true, // Use headless mode
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      `--allowlisted-extension-id=${EXTENSION_ID}`,
      '--autoplay-policy=no-user-gesture-required',
      '--window-size=1920,1080', // Set specific window size
      '--window-position=0,0', // Position at top-left
      '--disable-web-security', // Allow cross-origin requests for streaming
      '--disable-features=VizDisplayCompositor', // Better for screen capture
      '--headless=new', // Use new headless mode via command line arg
    ],
    defaultViewport: null, // Use full available viewport
  };
}

/** Launch browser, ensuring the extension is loaded */
async function launchBrowserWithExtension(): Promise<Browser> {
  const options = buildLaunchOptions();
  console.log('Launching browser with options:', options);
  const browserInstance = await puppeteer.launch(options);
  console.log('Browser launched.');
  return browserInstance;
}

/** Wait for the extension streaming page (not background script) */
async function findStreamingPage(browser: Browser, timeout = 15000): Promise<Page> {
  console.log(`Looking for streaming page: chrome-extension://${EXTENSION_ID}/streaming.html`);
  
  // First, let's see what targets are available
  const initialTargets = browser.targets().map(t => ({ 
    type: t.type(), 
    url: t.url() 
  }));
  console.log('Available targets before waiting:', initialTargets);
  
  try {
    const target = await browser.waitForTarget(
      t => {
        const isMatch = t.type() === 'page' && 
                       t.url() === `chrome-extension://${EXTENSION_ID}/streaming.html`;
        if (t.url().includes('chrome-extension')) {
          console.log(`Checking target: ${t.type()} - ${t.url()} - Match: ${isMatch}`);
        }
        return isMatch;
      },
      { timeout }
    );
    
    if (!target) {
      const debugTargets = browser.targets().map(t => ({ 
        type: t.type(), 
        url: t.url() 
      }));
      console.error('Streaming page not found. Existing targets:', debugTargets);
      throw new Error(`Streaming page chrome-extension://${EXTENSION_ID}/streaming.html not found within timeout.`);
    }
    
    const page = await target.page();
    if (!page) {
      throw new Error('Failed to get page from streaming target');
    }
    
    console.log('Found streaming page successfully');
    return page;
  } catch (error) {
    // If timeout, let's see what targets we have at the end
    const finalTargets = browser.targets().map(t => ({ 
      type: t.type(), 
      url: t.url() 
    }));
    console.error('Failed to find streaming page. Final targets:', finalTargets);
    throw error;
  }
}

/** Check if INITIALIZE function exists in the page */
async function assertExtensionLoaded(page: Page, maxRetries = 3) {
  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const hasInitialize = await page.evaluate(() => typeof (globalThis as any).INITIALIZE === 'function');
      if (hasInitialize) {
        console.log('INITIALIZE function found in extension page');
        return;
      }
    } catch (error) {
      console.log(`Attempt ${attempt + 1}: INITIALIZE not ready yet`);
    }
    await wait(Math.pow(100, attempt)); // 100ms, 1s, 10s
  }
  throw new Error('Could not find INITIALIZE function in the browser context after retries');
}

/** Start monitoring active connections via Puppeteer polling */
async function startConnectionMonitoring() {
  if (!streamingPage) {
    console.warn('Cannot start connection monitoring: no active streaming page');
    return;
  }

  console.log('Starting connection monitoring...');
  
  connectionCheckInterval = setInterval(async () => {
    try {
      if (!streamingPage) {
        console.log('Streaming page no longer available, stopping monitoring');
        stopConnectionMonitoring();
        return;
      }

      const activeCount = await streamingPage.evaluate(() => {
        return window.activeConnections ? window.activeConnections.size : 0;
      });
      
      // Enhanced debugging - show what's actually in the set
      const activeConnectionsDebug = await streamingPage.evaluate(() => {
        if (!window.activeConnections) return { size: 0, connections: [] };
        return {
          size: window.activeConnections.size,
          connections: Array.from(window.activeConnections)
        };
      });
      
      // Check streaming debug info
      const streamingDebug = await streamingPage.evaluate(() => {
        return window.streamingDebug || { debug: 'not available' };
      });
      
      // Get more detailed extension state
      const extensionState = await streamingPage.evaluate(() => {
        return {
          hasStreamingDebug: typeof window.streamingDebug !== 'undefined',
          hasActiveConnections: typeof window.activeConnections !== 'undefined',
          hasInitializeFunction: typeof window.INITIALIZE === 'function',
          windowKeys: Object.keys(window).filter(key => key.includes('streaming') || key.includes('active') || key.includes('INITIALIZE')),
          location: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        };
      });
      
      console.log(`Active connections: ${activeCount}`);
      console.log(`Connection details:`, activeConnectionsDebug);
      console.log(`Streaming debug:`, streamingDebug);
      console.log(`Extension state:`, extensionState);
      
      if (activeCount === 0 && !shutdownTimer) {
        console.log(`No active connections, starting ${GRACE_PERIOD_MS}ms shutdown timer...`);
        shutdownTimer = setTimeout(() => {
          console.log('Grace period expired, shutting down browser...');
          shutdownBrowser();
        }, GRACE_PERIOD_MS);
      } else if (activeCount > 0 && shutdownTimer) {
        console.log('Active connections detected, cancelling shutdown timer');
        clearTimeout(shutdownTimer);
        shutdownTimer = null;
      }
    } catch (error) {
      console.error('Failed to check connection status:', error);
      // Continue monitoring even if one check fails
    }
  }, POLL_INTERVAL_MS);
}

/** Stop connection monitoring */
function stopConnectionMonitoring() {
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval);
    connectionCheckInterval = null;
    console.log('Connection monitoring stopped');
  }
  
  if (shutdownTimer) {
    clearTimeout(shutdownTimer);
    shutdownTimer = null;
    console.log('Shutdown timer cancelled');
  }
}

/** Gracefully shutdown the browser and clean up resources */
async function shutdownBrowser() {
  console.log('Shutting down browser...');
  
  stopConnectionMonitoring();
  
  if (browser) {
    try {
      await browser.close();
      console.log('Browser closed successfully');
    } catch (error) {
      console.error('Error closing browser:', error);
    }
    browser = undefined;
    activePage = undefined;
    streamingPage = undefined;
  }
}

/* ---------- Route Handlers ---------- */
async function handleHealth(): Promise<Response> {
  return jsonResponse({
    status: 'healthy',
    puppeteer: 'imported',
    location: process.env.CLOUDFLARE_LOCATION || 'local',
    region: process.env.CLOUDFLARE_REGION || 'dev',
    expectedExtensionId: EXTENSION_ID,
    browserActive: !!browser,
    monitoringActive: !!connectionCheckInterval,
  });
}

async function handlePing(): Promise<Response> {
  return jsonResponse({
    status: 'pong',
    timestamp: Date.now(),
    browserActive: !!browser,
  });
}

async function handleTest(): Promise<Response> {
  let testBrowser: Browser | undefined;
  try {
    testBrowser = await launchBrowserWithExtension();
    const version = await testBrowser.version();
    streamingPage = await findStreamingPage(testBrowser);
    await testBrowser.close();
    return jsonResponse({
      status: 'success',
      browserVersion: version,
      extensionFound: true,
      extensionId: EXTENSION_ID,
    });
  } catch (err: any) {
    console.error('handleTest error:', err);
    if (testBrowser) await testBrowser.close();
    return jsonResponse({ status: 'error', message: err.message }, { status: 500 });
  }
}

async function handleStartStream(req: Request): Promise<Response> {
  try {
    const { url: targetUrl, peerId: destPeerId } = await req.json();
    if (!targetUrl || !destPeerId) {
      return jsonResponse({ error: 'Missing targetUrl or peerId' }, { status: 400 });
    }

    // Use existing browser or launch new one
    if (!browser) {
      console.log('No existing browser, launching new instance...');
      browser = await launchBrowserWithExtension();
    } else {
      console.log('Using existing browser instance');
    }

    // Create new page for this stream
    const page = await browser.newPage();
    activePage = page; // Set as active page for monitoring
    
    // Navigate to target URL
    await page.goto(targetUrl);
    
    // Set page to full screen
    await page.setViewport({ width: 1920, height: 1080 }); // Set a large viewport

    // Get extension streaming page and initialize streaming
    streamingPage = await findStreamingPage(browser);
    
    // Set up console log monitoring for the extension page
    streamingPage.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      console.log(`[EXTENSION-${type.toUpperCase()}] ${text}`);
    });
    
    streamingPage.on('pageerror', (error) => {
      console.error('[EXTENSION-ERROR] Page error:', error.message);
    });
    
    // Test if we can execute code in the extension context
    console.log('🧪 Testing extension context execution...');
    try {
      const testResult = await streamingPage.evaluate(() => {
        console.log('[TEST] This is a test log from extension context');
        return {
          location: window.location.href,
          hasWindow: typeof window !== 'undefined',
          hasPeer: typeof (globalThis as any).Peer !== 'undefined',
          hasChrome: typeof (globalThis as any).chrome !== 'undefined',
          hasTabCapture: typeof (globalThis as any).chrome !== 'undefined' && typeof (globalThis as any).chrome.tabCapture !== 'undefined',
          windowKeys: Object.keys(window).filter(key => 
            key.includes('streaming') || 
            key.includes('active') || 
            key.includes('INITIALIZE') ||
            key.includes('Peer')
          )
        };
      });
      console.log('🧪 Extension context test result:', testResult);
    } catch (error) {
      console.error('🧪 Extension context test failed:', error);
    }
    
    // Ensure INITIALIZE function is loaded
    await assertExtensionLoaded(streamingPage);

    // Force a simple log to test console monitoring
    console.log('🔍 Forcing a test log in extension...');
    await streamingPage.evaluate(() => {
      console.log('[FORCED-TEST] This should appear in container logs if console monitoring works');
      console.error('[FORCED-ERROR] This is a test error');
      console.warn('[FORCED-WARN] This is a test warning');
    });
    
    console.log('🔍 Test logs sent, checking if they appeared above...');

    const srcPeerId = crypto.randomUUID();
    const peers = { srcPeerId, destPeerId };

    // Initialize streaming in extension page
    console.log('🚀 About to call INITIALIZE function with params:', peers);
    console.log('🚀 Extension page URL:', streamingPage.url());
    
    try {
      await Promise.race([
        streamingPage.evaluate(async (p: any) => {
          console.log('[PUPPETEER] INITIALIZE call starting with params:', p);
          // @ts-ignore
          const result = await INITIALIZE(p);
          console.log('[PUPPETEER] INITIALIZE call completed, result:', result);
          return result;
        }, peers),
        new Promise((_, reject) => setTimeout(() => reject(new Error('INITIALIZE timeout')), 30000)),
      ]);
      
      console.log('✅ INITIALIZE function completed successfully');
      
      // Check the state immediately after INITIALIZE
      const postInitState = await streamingPage.evaluate(() => {
        return {
          activeConnections: window.activeConnections ? Array.from(window.activeConnections) : null,
          activeConnectionsSize: window.activeConnections ? window.activeConnections.size : 0,
          streamingDebug: window.streamingDebug || null,
          hasInitialize: typeof window.INITIALIZE === 'function'
        };
      });
      
      console.log('📊 Post-INITIALIZE state:', postInitState);
      
    } catch (error) {
      console.error('❌ INITIALIZE function failed:', error);
      console.error('❌ Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      throw error; // Re-throw to propagate the error
    }

    // Start connection monitoring if not already running
    if (!connectionCheckInterval) {
      startConnectionMonitoring();
    }

    return jsonResponse({ 
      status: 'success', 
      srcPeerId, 
      browserWSEndpoint: browser.wsEndpoint(),
      monitoringActive: !!connectionCheckInterval
    });
  } catch (err: any) {
    console.error('handleStartStream error:', err);
    // Don't close browser on error - let monitoring handle lifecycle
    return jsonResponse({ status: 'error', message: err.message }, { status: 500 });
  }
}

/* ---------- Bun Server ---------- */
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const { pathname } = url;

    try {
      // Handle CORS preflight requests
      if (req.method === 'OPTIONS') {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      if (pathname === '/health') return await handleHealth();
      if (pathname === '/ping') return await handlePing();
      if (pathname === '/test-puppeteer') return await handleTest();
      if (pathname === '/start-stream' && req.method === 'POST') return await handleStartStream(req);
      return new Response('Not Found', { status: 404 });
    } catch (err: any) {
      console.error('Unhandled error:', err);
      return jsonResponse({ error: err.message }, { status: 500 });
    }
  },
});

// Graceful shutdown on process termination
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await shutdownBrowser();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await shutdownBrowser();
  process.exit(0);
});

console.log(`Container server running at http://localhost:${server.port}`); 