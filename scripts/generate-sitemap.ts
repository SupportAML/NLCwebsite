/**
 * Generates dist/sitemap.xml at build time. New blog posts are picked up
 * automatically because posts.ts is re-read on every build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const BASE = 'https://www.neurolegalconsulting.com';
const TODAY = new Date().toISOString().slice(0, 10);

const { blogPosts } = await import(pathToFileURL(path.join(root, 'src/blog/posts.ts')).href);
const posts = blogPosts as Array<{ slug: string; date: string }>;
const newest = posts.map((p) => p.date).sort().at(-1) ?? TODAY;

const entries = [
  { loc: `${BASE}/`, lastmod: TODAY, priority: '1.0' },
  { loc: `${BASE}/blog`, lastmod: newest, priority: '0.8' },
  ...posts.map((p) => ({ loc: `${BASE}/blog/${p.slug}`, lastmod: p.date || TODAY, priority: '0.7' })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <priority>${e.priority}</priority>\n  </url>`),
  '</urlset>',
  '',
].join('\n');

if (!fs.existsSync(distDir)) {
  console.error(`dist/ missing at ${distDir}. Run "vite build" first.`);
  process.exit(1);
}
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`✓ Wrote sitemap.xml with ${entries.length} URLs`);
