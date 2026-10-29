import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App';

export interface RenderResult {
  html: string;
  head: string;
}

/**
 * React 19 + react-helmet-async v3 rely on React's native metadata hoisting,
 * which only fires inside streaming renderers (renderToPipeableStream / ReadableStream).
 * `renderToString` keeps the tags wherever they appear in the tree — typically the top
 * of #root. We extract them here and hand them back as the `head` string so the prerender
 * script can splice them into <head>.
 *
 * Hoisted: <title>, <meta>, <link>, and <script type="application/ld+json">.
 */
function hoistHead(html: string): { head: string; body: string } {
  const headParts: string[] = [];
  let body = html;

  body = body.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, (m) => {
    headParts.push(m);
    return '';
  });

  body = body.replace(/<meta\b[^>]*\/?>/gi, (m) => {
    headParts.push(m);
    return '';
  });

  body = body.replace(/<link\b[^>]*\/?>/gi, (m) => {
    headParts.push(m);
    return '';
  });

  body = body.replace(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    (m) => {
      headParts.push(m);
      return '';
    },
  );

  // De-dup identical head tags (Helmet can emit twice under SSR with React 19).
  const unique = Array.from(new Set(headParts));

  return { head: unique.join('\n    '), body };
}

export function render(url: string): RenderResult {
  const raw = renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const { head, body } = hoistHead(raw);
  return { html: body, head };
}
