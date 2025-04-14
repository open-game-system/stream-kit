import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Server might primarily use CJS
  dts: { resolve: true },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    '@open-game-system/stream-kit-types',
    'puppeteer', // Mark peer dependencies as external
    'fast-json-patch'
  ],
}); 