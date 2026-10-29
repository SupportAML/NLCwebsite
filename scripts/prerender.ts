/**
 * Postbuild prerender script.
 *
 * Walks every route in the app and writes a static HTML file per route,
 * with Helmet-managed <title>, <meta description>, OG tags, <link rel="canonical">,
 * and JSON-LD baked into the source so crawlers see real content.
 *
 * Pipeline (driven by `npm run build`):
 *   1. vite build            → dist/ (client bundle + dist/index.html template)
 *   2. vite build --ssr ...  → dist-ssr/entry-server.js (server render function)
 *   3. tsx scripts/prerender.ts → dist/<route>/index.html for every route
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

if (!fs.existsSync(ssrEntry)) {
  console.error(`SSR bundle missing at ${ssrEntry}. Run "vite build --ssr src/entry-server.tsx --outDir dist-ssr" first.`);
  process.exit(1);
}

const { render } = await import(pathToFileURL(ssrEntry).href) as {
  render: (url: string) => { html: string; head: string };
};

const { blogPosts } = await import(pathToFileURL(path.join(root, 'src/blog/posts.ts')).href);

interface Slugged { slug: string }

const routes: string[] = [
  '/',
  '/blog',
  ...(blogPosts as Slugged[]).map((p) => `/blog/${p.slug}`),
];

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

function injectRendered(template: string, head: string, body: string): string {
  // Strip default <title> and <meta name="description"> baked into index.html —
  // Helmet output below is the authoritative source for those.
  const out = template
    .replace(/\s*<title>[^<]*<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '')
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body);
  return out;
}

let count = 0;
for (const url of routes) {
  let rendered;
  try {
    rendered = render(url);
  } catch (err) {
    console.error(`✗ Failed to render ${url}:`, err);
    process.exit(1);
  }

  const output = injectRendered(template, rendered.head, rendered.html);

  const outPath = url === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, url, 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  count++;
}

console.log(`✓ Prerendered ${count} routes`);
