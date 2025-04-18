import puppeteer from 'puppeteer';

// Simple hello world server to test container setup
const server = Bun.serve({
  port: 8080,
  fetch(req) {
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

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Container server running at http://localhost:${server.port}`); 