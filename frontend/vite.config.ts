import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Isso ajuda o Vite a saber como tratar 'global'
      },
    },
  },
})
