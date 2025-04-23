import puppeteer from 'puppeteer';
import type { PuppeteerLaunchOptions, Browser, Target } from 'puppeteer';
import crypto from 'crypto';

const EXTENSION_PATH = '/app/extension';
const EXTENSION_ID = 'jjndjgheafjngoipoacpjgeicjeomjli';
const EXTENSION_URL_PREFIX = `chrome-extension://${EXTENSION_ID}/`;

/** Utility: Create JSON response */
function jsonResponse(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });
}

/** Build Puppeteer launch options */
function buildLaunchOptions(): PuppeteerLaunchOptions {
  return {
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      `--allowlisted-extension-id=${EXTENSION_ID}`,
      '--autoplay-policy=no-user-gesture-required',
    ],
  };
}

/** Launch browser, ensuring the extension is loaded */
async function launchBrowserWithExtension(): Promise<Browser> {
  const options = buildLaunchOptions();
  console.log('Launching browser with options:', options);
  const browser = await puppeteer.launch(options);
  console.log('Browser launched.');
  return browser;
}

/** Wait for the extension target (background/service worker) */
async function findExtensionTarget(browser: Browser, timeout = 15000): Promise<Target> {
  const target = await browser.waitForTarget(
    t => (t.type() === 'background_page' || t.type() === 'service_worker') &&
         t.url().startsWith(EXTENSION_URL_PREFIX),
    { timeout }
  );
  if (!target) {
    const debugTargets = browser.targets().map(t => ({ type: t.type(), url: t.url() }));
    console.error('Extension target not found. Existing targets:', debugTargets);
    throw new Error(`Extension with ID ${EXTENSION_ID} not found within timeout.`);
  }
  return target;
}

/* ---------- Route Handlers ---------- */
async function handleHealth(): Promise<Response> {
  return jsonResponse({
    status: 'healthy',
    puppeteer: 'imported',
    location: process.env.CLOUDFLARE_LOCATION || 'local',
    region: process.env.CLOUDFLARE_REGION || 'dev',
    expectedExtensionId: EXTENSION_ID,
  });
}

async function handleTest(): Promise<Response> {
  let browser: Browser | undefined;
  try {
    browser = await launchBrowserWithExtension();
    const version = await browser.version();
    await findExtensionTarget(browser);
    await browser.close();
    return jsonResponse({
      status: 'success',
      browserVersion: version,
      extensionFound: true,
      extensionId: EXTENSION_ID,
    });
  } catch (err: any) {
    console.error('handleTest error:', err);
    if (browser) await browser.close();
    return jsonResponse({ status: 'error', message: err.message }, { status: 500 });
  }
}

async function handleStartStream(req: Request): Promise<Response> {
  let browser: Browser | undefined;
  try {
    const { url: targetUrl, peerId: destPeerId } = await req.json();
    if (!targetUrl || !destPeerId) return jsonResponse({ error: 'Missing targetUrl or peerId' }, { status: 400 });

    browser = await launchBrowserWithExtension();
    const page = await browser.newPage();
    await page.goto(targetUrl);

    const extTarget = await findExtensionTarget(browser);
    let context: any;
    context = extTarget.type() === 'service_worker' ? await extTarget.worker() : await extTarget.page();
    if (!context) throw new Error('Failed to obtain extension execution context');

    const srcPeerId = crypto.randomUUID();
    const peers = { srcPeerId, destPeerId };

    await Promise.race([
      context.evaluate(async (p: any) => {
        // @ts-ignore
        if (typeof INITIALIZE !== 'function') throw new Error('INITIALIZE not found');
        // @ts-ignore
        await INITIALIZE(p);
      }, peers),
      new Promise((_, reject) => setTimeout(() => reject(new Error('INITIALIZE timeout')), 30000)),
    ]);

    return jsonResponse({ status: 'success', srcPeerId, browserWSEndpoint: browser.wsEndpoint() });
  } catch (err: any) {
    console.error('handleStartStream error:', err);
    if (browser) await browser.close();
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
      if (pathname === '/health') return await handleHealth();
      if (pathname === '/test-puppeteer') return await handleTest();
      if (pathname === '/start-stream' && req.method === 'POST') return await handleStartStream(req);
      return new Response('Not Found', { status: 404 });
    } catch (err: any) {
      console.error('Unhandled error:', err);
      return jsonResponse({ error: err.message }, { status: 500 });
    }
  },
});

console.log(`Container server running at http://localhost:${server.port}`); 