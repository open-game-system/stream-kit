# Use Bun as base image
FROM oven/bun:1 as base

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Chromium browser (arm64-compatible) and dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        chromium \
        fonts-liberation \
        libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
        libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 \
        libnspr4 libnss3 libxcomposite1 libxdamage1 libxfixes3 \
        libxkbcommon0 libxrandr2 xdg-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (puppeteer-core doesn't download Chromium)
RUN bun install

# Copy source
COPY . .

# Set environment variable to use system Chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Run the app
EXPOSE 8080
CMD ["bun", "run", "src/server.ts"] 