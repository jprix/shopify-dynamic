import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { hydrogen } from '@shopify/hydrogen/vite'; // Corrected path for hydrogen plugin
import { vitePlugin as remix } from '@remix-run/dev';

// Replace the HOST env var with SHOPIFY_APP_URL to avoid breaking the remix server
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

const host = new URL(process.env.SHOPIFY_APP_URL || 'http://localhost').hostname;
let hmrConfig;

if (host === 'localhost') {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: 'wss',
    host: host,
    port: parseInt(process.env.FRONTEND_PORT) || 8002,
    clientPort: 443,
  };
}

export default defineConfig({
  server: {
    port: Number(process.env.PORT || 3000),
    hmr: hmrConfig,
    fs: {
      allow: [
        'app',
        'node_modules',
        '/Users/jason/Development/shopify-dynamic/app',
        '/Users/jason/Development/shopify-dynamic/providers',
      ],
    },
  },
  plugins: [
    hydrogen(), // Correct hydrogen plugin import
    tsconfigPaths(),
    remix({
      ignoredRouteFiles: ["**/.*"],
    }),
    
  ],
  optimizeDeps: {
    exclude: ['@solana/spl-type-length-value'], // Exclude the problematic package
  },
  build: {
    assetsInlineLimit: 0,
  },
});
