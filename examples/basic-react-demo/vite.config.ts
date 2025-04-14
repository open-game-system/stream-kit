import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: [
      '@open-game-system/stream-kit-react',
      '@open-game-system/stream-kit-web',
      '@open-game-system/stream-kit-types'
    ]
  }
}); 