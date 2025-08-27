import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: { process: true },
    })
  ],
  optimizeDeps: {
    exclude: ['express', 'destroy', 'etag', 'send', 'mime']
  }
});
