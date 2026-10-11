import type { APIRoute } from 'astro';

// Generated, so the sitemap address follows `site` in astro.config.mjs.
export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      `Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
