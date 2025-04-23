import puppeteer from 'puppeteer';
import type { PuppeteerLaunchOptions } from 'puppeteer'; // Import the type
import crypto from 'crypto'; // Needed for generating peer IDs

const EXTENSION_PATH = '/app/extension'; // Path inside the container
// Use the ID from the old library code
const EXTENSION_ID = 'jjndjgheafjngoipoacpjgeicjeomjli';

// Simple hello world server to test container setup
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Function to launch browser with extension, adapted from old library logic
    async function launchBrowserWithExtension() {
      console.log(`Launching browser with extension ID: ${EXTENSION_ID}...`);

      const launchOptions: PuppeteerLaunchOptions = {
        headless: "new", // Use "new" headless mode which supports extensions
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: [
          // Standard container args
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          // Args from old library for extension loading
          `--disable-extensions-except=${EXTENSION_PATH}`,
          `--load-extension=${EXTENSION_PATH}`,
          `--allowlisted-extension-id=${EXTENSION_ID}`, // Use the specific ID
          '--autoplay-policy=no-user-gesture-required',
          // Optional: Window size from old library (uncomment if needed)
          // '--window-size=1920,1080',
        ],
      };

      console.log("Puppeteer Launch Options:", launchOptions);

      const browser = await puppeteer.launch(launchOptions);
      console.log('Browser launched successfully.');
      return browser;
    }

    // Health check endpoint
    if (pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        puppeteer: 'imported',
        location: process.env.CLOUDFLARE_LOCATION || 'local',
        region: process.env.CLOUDFLARE_REGION || 'dev',
        expectedExtensionId: EXTENSION_ID // Indicate the expected ID
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test Puppeteer endpoint to check specific extension ID
    if (pathname === '/test-puppeteer') {
      let browser;
      try {
        console.log(`Testing Puppeteer: checking for extension ID ${EXTENSION_ID}...`);
        browser = await launchBrowserWithExtension();
        const version = await browser.version();

        // Verify the specific extension loaded by finding its target using the known ID
        // Extensions can run as background pages (Manifest V2) or service workers (Manifest V3)
        console.log(`Waiting for extension target with ID ${EXTENSION_ID}...`);
        const extensionTarget = await browser.waitForTarget(
          (target) => (target.type() === 'background_page' || target.type() === 'service_worker') &&
                      target.url().startsWith(`chrome-extension://${EXTENSION_ID}/`),
          { timeout: 15000 } // Add timeout for waiting
        );

        if (!extensionTarget) {
          // If not found, list available targets for debugging
          const targets = browser.targets();
          const targetInfo = targets.map(t => ({ type: t.type(), url: t.url() }));
          console.error("Available targets:", targetInfo);
          throw new Error(`Extension target with ID ${EXTENSION_ID} not found within timeout.`);
        }
        console.log(`Extension ${EXTENSION_ID} loaded successfully: URL=${extensionTarget.url()}`);

        await browser.close();

        return new Response(JSON.stringify({
          status: 'success',
          browserVersion: version,
          extensionFound: true,
          extensionId: EXTENSION_ID,
          message: `Puppeteer launched and extension ${EXTENSION_ID} target found.`
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        console.error('Puppeteer test with extension failed:', error);
        if (browser) await browser.close(); // Ensure browser is closed on error
        return new Response(JSON.stringify({
          status: 'error',
          message: error.message || 'Unknown error',
          stack: error.stack || ''
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // New endpoint for starting the stream
    if (pathname === '/start-stream' && req.method === 'POST') {
      let browser;
      try {
        const { url: targetUrl, peerId: destPeerId } = await req.json();
        if (!targetUrl || !destPeerId) {
          return new Response(JSON.stringify({ error: 'Missing targetUrl or peerId (destPeerId)' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // --- Browser Management (Placeholder) ---
        console.log(`Received /start-stream request for URL: ${targetUrl}, Dest Peer: ${destPeerId}`);
        browser = await launchBrowserWithExtension();
        // --- End Browser Management ---

        const page = await browser.newPage();
        console.log(`Navigating page to: ${targetUrl}`);
        await page.goto(targetUrl);
        console.log(`Page navigated successfully.`);

        // Find the extension's background target using the known ID
        console.log(`Waiting for extension target with ID ${EXTENSION_ID} for streaming...`);
        const extensionTarget = await browser.waitForTarget(
          (target) => (target.type() === 'background_page' || target.type() === 'service_worker') &&
                      target.url().startsWith(`chrome-extension://${EXTENSION_ID}/`),
          { timeout: 15000 } // Add timeout
        );
        if (!extensionTarget) throw new Error(`Could not find extension's background target with ID ${EXTENSION_ID} within timeout.`);
        console.log(`Found extension target: ${extensionTarget.url()}`);

        // Get the execution context (background page or service worker)
        let context;
        const targetType = extensionTarget.type();
        console.log(`Extension target type: ${targetType}`);
        if (targetType === 'background_page') { // Manifest V2
           context = await extensionTarget.page();
        } else if (targetType === 'service_worker') { // Manifest V3
           context = await extensionTarget.worker();
        }
        if (!context) throw new Error(`Could not get execution context for extension target type: ${targetType}`);

        // Generate the source peer ID for the server-side (extension) peer
        const srcPeerId = crypto.randomUUID();
        const peers = { srcPeerId, destPeerId };

        console.log(`Calling INITIALIZE in extension context (${EXTENSION_ID}) with peers:`, peers);

        // Execute the INITIALIZE function within the extension's context.
        await Promise.race([
          context.evaluate(
            async (passedPeers) => {
              // @ts-ignore - INITIALIZE is defined in the extension's global scope (window/self)
              if (typeof INITIALIZE !== 'function') {
                console.error('INITIALIZE function not found in extension context global scope!');
                throw new Error('INITIALIZE function not found in extension context');
              }
              console.log('[Extension Context] Calling INITIALIZE with:', passedPeers);
              // @ts-ignore
              await INITIALIZE(passedPeers);
              console.log('[Extension Context] INITIALIZE finished.');
              return { success: true }; // Ensure evaluate resolves
            },
            peers
          ),
          new Promise((_, reject) => setTimeout(() => reject(new Error('context.evaluate timed out after 30 seconds')), 30000))
        ]);

        console.log('INITIALIZE called in extension successfully via evaluate.');

        // --- Browser Lifecycle Management (Placeholder) ---
        // Keep browser open for streaming
        // Need logic to close it later (e.g., /stop-stream endpoint)

        return new Response(JSON.stringify({
            status: 'success',
            message: 'Stream initialization requested.',
            srcPeerId: srcPeerId,
            browserWSEndpoint: browser.wsEndpoint()
        }), {
          headers: { 'Content-Type': 'application/json' },
        });

      } catch (error: any) {
        console.error('Stream initialization failed:', error);
        if (browser) {
            try { await browser.close(); } catch (closeErr) { console.error("Failed to close browser on error:", closeErr); }
        }
        return new Response(JSON.stringify({
          status: 'error',
          message: error.message || 'Unknown error during stream initialization',
          stack: error.stack || ''
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Default 404
    return new Response('Not Found', { status: 404 });
  },
  error(error: Error) {
    console.error("Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`Container server running at http://localhost:${server.port}`); 