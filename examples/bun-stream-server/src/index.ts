const OPEN_CONTAINER_PORT = 8080;

// Helper functions
async function startAndWaitForPort(
  container: Container,
  portToAwait: number,
  maxTries = 10
) {
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
      if (
        err.message.includes("listening") ||
        err.message.includes(
          "there is no container instance that can be provided"
        )
      ) {
        await new Promise((res) => setTimeout(res, 300));
        continue;
      }
      throw err;
    }
  }
  throw new Error(
    `could not check container healthiness after ${maxTries} tries`
  );
}

async function waitForLocalhost(port: number, maxTries = 10) {
  for (let i = 0; i < maxTries; i++) {
    try {
      await fetch(`http://localhost:${port}/ping`);
      return;
    } catch (err: any) {
      console.error("Error connecting to localhost on", i, "try", err);
      await new Promise((res) => setTimeout(res, 300));
    }
  }
  throw new Error(
    `could not connect to localhost:${port} after ${maxTries} tries`
  );
}

async function proxyFetch(
  container: Container,
  request: Request,
  portNumber: number
): Promise<Response> {
  const response = await container
    .getTcpPort(portNumber)
    .fetch(request.url.replace("https://", "http://"), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  return response;
}

function createJsonResponse(data: unknown, init?: ResponseInit): Response {
  const jsonString = JSON.stringify(data);
  return new Response(jsonString, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  }) as unknown as Response;
}

// Durable Object implementation
export class MyContainer implements DurableObject {
  constructor(
    private readonly ctx: DurableObjectState,
    private readonly env: Env
  ) {
    ctx.blockConcurrencyWhile(async () => {
      if (!ctx.container) {
        // No container available, wait for localhost to be available
        console.log("No container binding found, using localhost:8080");
        await waitForLocalhost(OPEN_CONTAINER_PORT);
      } else {
        // Container available, start and wait for it
        console.log("Container binding found, starting container");
        await startAndWaitForPort(ctx.container, OPEN_CONTAINER_PORT);
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    try {
      if (!this.ctx.container) {
        // No container, proxy to localhost:8080
        const localUrl = request.url.replace(new URL(request.url).origin, 'http://localhost:8080');
        const response = await fetch(localUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body,
        });
        return response;
      } else {
        // Use the container
        return await proxyFetch(
          this.ctx.container,
          request,
          OPEN_CONTAINER_PORT
        );
      }
    } catch (error) {
      return createJsonResponse(
        { error: (!this.ctx.container ? "Local server" : "Container") + " error: " + (error as Error).message },
        { status: 500 }
      );
    }
  }
}

// Worker entry point
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Always route through Durable Objects
    const id = env.MY_CONTAINER.idFromName(pathname);
    const stub = env.MY_CONTAINER.get(id);
    return await stub.fetch(request);
  },
};
