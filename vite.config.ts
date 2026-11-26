import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {generateRouteHtmlFiles} from './scripts/generate-route-html.mjs';

function routeHtmlGeneratorPlugin() {
  return {
    name: 'anivex-route-html-generator',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      try {
        generateRouteHtmlFiles(distDir);
      } catch {
        // Skip if dist/index.html was not produced (e.g. non-client build)
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), routeHtmlGeneratorPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
