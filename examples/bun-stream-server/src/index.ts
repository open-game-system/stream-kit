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

async function proxyFetch(
  container: any,
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
  // Convert data to string first
  const jsonString = JSON.stringify(data);
  // Create response with explicit headers
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
      console.log("concurrency");
      console.log("concurrency");
      console.log("concurrency", ctx);
      console.log("concurrency", ctx);
      const container = ctx.container;
      if (!container) {
        throw new Error("Container is not available");
      }
      await startAndWaitForPort(container, OPEN_CONTAINER_PORT);
    });
  }

  async fetch(request: Request): Promise<Response> {
    try {
      if (!this.ctx.container) {
        throw new Error("Container is not available");
      }
      return await proxyFetch(
        this.ctx.container,
        request,
        OPEN_CONTAINER_PORT
      );
    } catch (error) {
      return createJsonResponse(
        { error: "Container error: " + (error as Error).message },
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

    if (
      pathname.startsWith("/stream") ||
      pathname === "/health" ||
      pathname === "/test-puppeteer"
    ) {
      const id = env.MY_CONTAINER.idFromName(pathname);
      const stub = env.MY_CONTAINER.get(id);
      return await stub.fetch(request);
    }

    return createJsonResponse({
      message: "Stream Server Worker",
      endpoints: [
        "GET /health",
        "POST /stream",
        "GET /stream/:id",
        "DELETE /stream/:id",
        "GET /test-puppeteer",
      ],
    });
  },
};
