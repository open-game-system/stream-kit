# Hono Stream Kit Server Example

This example demonstrates how to use the `@open-game-system/stream-kit-server` package within a basic [Hono](https://hono.dev/) application running on Node.js.

## Setup

1.  **Install Dependencies:** From the root of the monorepo, run `pnpm install` to install dependencies for all packages, including this example.

2.  **Environment Variables (Optional):**
    *   `PORT`: The port the server should listen on (default: `3000`).
    *   `PEERJS_HOST`, `PEERJS_PORT`, `PEERJS_PATH`, `PEERJS_KEY`, `PEERJS_SECURE`, `PEERJS_DEBUG`: Configure connection to your PeerJS server (see `stream-kit-server` README for details).
    *   `PUPPETEER_EXECUTABLE_PATH`: Set this if Puppeteer cannot find your Chrome/Chromium installation automatically.

## Running the Example

1.  **Navigate to the example directory:**
    ```bash
    cd examples/hono-stream-server
    ```

2.  **Run in development mode (using ts-node):**
    ```bash
    pnpm dev
    ```

3.  **Build and run the compiled version:**
    ```bash
    pnpm build
    pnpm start
    ```

The server will start (defaulting to `http://localhost:3000`).

## Running with Docker

This example includes a `Dockerfile` designed to test the server with Puppeteer in a containerized environment based on the official Puppeteer images.

1.  **Build the Docker Image:** From the **root of the monorepo**, run:
    ```bash
    # Ensure all packages are built first (especially stream-kit-server)
    pnpm build

    # Build the docker image
    docker build -t hono-stream-server-example -f examples/hono-stream-server/Dockerfile .
    ```

2.  **Run the Docker Container:**
    ```bash
    docker run -p 3000:3000 --rm hono-stream-server-example
    ```
    *   `-p 3000:3000`: Maps port 3000 on your host to port 3000 in the container.
    *   `--rm`: Automatically removes the container when it exits.
    *   You might need to pass environment variables for PeerJS configuration, e.g., `-e PEERJS_HOST=your_peerjs_server`.

## Endpoints

*   `GET /`: Basic server information.
*   `POST /stream/start-stream`: Endpoint provided by `stream-kit-server` to initiate a streaming session. Requires a JSON body like: `{ "gameUrl": "https://example.com", "sessionId": "unique-peer-id-for-streamer" }`.
*   `GET /stream/sessions`: Debugging endpoint from `stream-kit-server` to list active sessions.
*   `DELETE /stream/session/:sessionId`: Debugging endpoint from `stream-kit-server` to terminate a specific session.
