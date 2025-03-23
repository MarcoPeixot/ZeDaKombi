
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
    process: { env: {} },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
});
