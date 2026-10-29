import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command, isSsrBuild }) => ({
  // Absolute base: with './' every /blog/<slug> page requested /blog/assets/... and loaded blank.
  base: '/',
  // inspectAttr adds code-path="src/..." attributes for the dev inspector; keep it out of production HTML.
  plugins: [command === 'serve' && inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // react-helmet-async is CJS — bundle it so the SSR ESM build can import its named exports.
    noExternal: ['react-helmet-async', 'gsap', /^gsap\//],
  },
  // Client-only vendor splitting (the SSR bundle used by scripts/prerender.ts stays one entry).
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            manualChunks(id: string) {
              if (!id.includes('node_modules')) return;
              if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
                return 'react-vendor';
              }
              if (/[\\/]node_modules[\\/](gsap|@gsap)[\\/]/.test(id)) {
                return 'gsap';
              }
              if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/lucide-react')) {
                return 'ui-vendor';
              }
            },
          },
        },
      },
}));
