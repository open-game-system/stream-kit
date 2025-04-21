import puppeteer from 'puppeteer';

// Simple hello world server to test container setup
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Health check endpoint
    if (pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        puppeteer: 'imported',
        location: process.env.CLOUDFLARE_LOCATION || 'local',
        region: process.env.CLOUDFLARE_REGION || 'dev'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test Puppeteer endpoint
    if (pathname === '/test-puppeteer') {
      try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
          headless: "new",
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        });
        
        const version = await browser.version();
        const wsEndpoint = browser.wsEndpoint();
        
        await browser.close();
        
        return new Response(JSON.stringify({
          status: 'success',
          browserVersion: version,
          wsEndpoint: wsEndpoint
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        console.error('Puppeteer test failed:', error);
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

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Container server running at http://localhost:${server.port}`); 