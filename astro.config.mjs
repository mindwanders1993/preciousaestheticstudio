// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// The address the site is served at. Canonical links, social-preview pictures, the sitemap, /robots.txt and
// /llms.txt are all built from it.
//
// On Vercel it follows the project's production domain, which Vercel gives every build: the `.vercel.app`
// address until a custom domain is attached, and the custom domain from then on. Anywhere else — a laptop,
// CI, another host — it is the studio's own domain (docs/specs/P8-preview-fixes.md).
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = productionHost ? `https://${productionHost}` : 'https://preciousaestheticstudio.com';

// https://astro.build/config
export default defineConfig({
  site,
  adapter: vercel(),
  integrations: [mdx(), sitemap()]
});