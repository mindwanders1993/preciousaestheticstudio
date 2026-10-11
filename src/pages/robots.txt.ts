import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Generated, so it follows two things: `site.launched` (src/data/site.ts) and `site` in astro.config.mjs.
// Until the site is launched, crawlers are asked to stay out altogether.
export const GET: APIRoute = ({ site: base }) => {
  const lines = site.launched
    ? [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        '',
        `Sitemap: ${new URL('/sitemap-index.xml', base).href}`,
      ]
    : [
        `# ${site.legalName} is not launched yet (site.launched is false in src/data/site.ts).`,
        '# Until it is, crawlers are asked to stay out of the whole site.',
        'User-agent: *',
        'Disallow: /',
      ];

  return new Response([...lines, ''].join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
