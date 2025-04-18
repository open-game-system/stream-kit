# Stream Kit Server Example (Cloudflare Containers)

This example demonstrates how to run a WebRTC streaming server using Cloudflare Containers, Bun, and Puppeteer. The server can capture browser content and stream it to clients using WebRTC.

## Architecture

- **Container**: Runs a Bun server with Puppeteer for browser automation and WebRTC streaming
- **Worker**: Manages container lifecycle and routes requests
- **Durable Object**: Maintains container state and handles container-specific operations

## Project Structure

```
.
├── wrangler.toml          # Cloudflare Workers/Containers config
├── package.json           # Worker dependencies
├── src/                   # Worker & Durable Object code
│   ├── index.ts          # Worker entry point
│   └── container.ts      # Durable Object implementation
├── container/             # Container application code
│   ├── Dockerfile        # Container configuration
│   ├── package.json      # Container-specific dependencies
│   ├── src/
│   │   └── server.ts     # Bun server with Puppeteer/WebRTC
│   └── tsconfig.json     # TypeScript config for container
└── README.md

```

## Code Organization

The project is split into two main parts:

1. **Worker & Durable Object** (`/src`):
   - Handles routing and container lifecycle
   - Implements the external API endpoints
   - Manages container state via Durable Objects

2. **Container Application** (`/container`):
   - Runs inside Cloudflare Container
   - Implements the actual streaming functionality
   - Uses Bun + Puppeteer for browser automation

## API Routes

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /stream` - Create a new stream session
- `GET /stream/:id` - Get stream info and status
- `DELETE /stream/:id` - Stop and cleanup stream

## Development

1. Install dependencies for both the Worker and Container:
```bash
# Install Worker dependencies
npm install

# Install Container dependencies
cd container && npm install
```

2. Test the container locally:
```bash
# Build the container (from the container directory)
cd container
docker build -t stream-server-test .

# Run it locally
docker run -p 8080:8080 --rm stream-server-test

# Test with curl
curl http://localhost:8080/health
```

3. Deploy to Cloudflare:
```bash
# From the root directory
wrangler deploy
```

## Container Details

The container runs:
- Bun for the server runtime
- Puppeteer for browser automation
- Chrome/Chromium for page rendering
- WebRTC for streaming

## Environment Variables

The container automatically receives these Cloudflare-provided variables:
- `CLOUDFLARE_COUNTRY_A2` - Two-letter country code
- `CLOUDFLARE_LOCATION` - Location name
- `CLOUDFLARE_REGION` - Region name

## Notes

- Initial container provisioning takes a few minutes
- Each container instance can handle one streaming session
- The Worker will automatically route requests to the appropriate container instance
- Container instances are recycled after periods of inactivity

## License

MIT License
