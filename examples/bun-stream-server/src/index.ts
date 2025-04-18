import { Container, DurableObject, DurableObjectState, DurableObjectNamespace, Request as WorkerRequest, Response as WorkerResponse } from '@cloudflare/workers-types';

interface Env {
  MY_CONTAINER: DurableObjectNamespace;
}

const OPEN_CONTAINER_PORT = 8080;

// Helper functions
async function startAndWaitForPort(container: Container, portToAwait: number, maxTries = 10) {
  const port = container.getTcpPort(portToAwait);
  let monitor;

  for (let i = 0; i < maxTries; i++) {
    try {
      if (!container.running) {
        container.start();
        monitor = container.monitor();
      }
      await (await port.fetch("http://ping")).text();
      return;
    } catch (err: any) {
      console.error("Error connecting to the container on", i, "try", err);
      if (err.message.includes("listening") || 
          err.message.includes("there is no container instance that can be provided")) {
        await new Promise((res) => setTimeout(res, 300));
        continue;
      }
      throw err;
    }
  }
  throw new Error(`could not check container healthiness after ${maxTries} tries`);
}

async function proxyFetch(container: any, request: WorkerRequest, portNumber: number): Promise<WorkerResponse> {
  const response = await container
    .getTcpPort(portNumber)
    .fetch(request.url.replace("https://", "http://"), {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
  return response;
}

function createJsonResponse(data: unknown, init?: ResponseInit): WorkerResponse {
  // Convert data to string first
  const jsonString = JSON.stringify(data);
  // Create response with explicit headers
  return new Response(jsonString, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    }
  }) as unknown as WorkerResponse;
}

// Durable Object implementation
export class MyContainer implements DurableObject {
  constructor(private readonly state: DurableObjectState, private readonly env: Env) {
    state.blockConcurrencyWhile(async () => {
      await startAndWaitForPort(state.container, OPEN_CONTAINER_PORT);
    });
  }

  async fetch(request: WorkerRequest): Promise<WorkerResponse> {
    try {
      return await proxyFetch(this.state.container, request, OPEN_CONTAINER_PORT);
    } catch (error) {
      return createJsonResponse(
        { error: 'Container error: ' + (error as Error).message },
        { status: 500 }
      );
    }
  }
}

// Worker entry point
export default {
  async fetch(request: WorkerRequest, env: Env): Promise<WorkerResponse> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname.startsWith('/stream') || pathname === '/health') {
      const id = env.MY_CONTAINER.idFromName(pathname);
      const stub = env.MY_CONTAINER.get(id);
      return await stub.fetch(request);
    }

    return createJsonResponse({
      message: 'Stream Server Worker',
      endpoints: [
        'GET /health',
        'POST /stream',
        'GET /stream/:id',
        'DELETE /stream/:id'
      ]
    });
  },
}; 