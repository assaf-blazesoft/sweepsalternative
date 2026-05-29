import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Update to the real apex once the domain is live.
const SITE = 'https://sweepsalternative.com';

export default defineConfig({
  site: SITE,
  integrations: [tailwind(), preact(), mdx(), sitemap()],
  build: { inlineStylesheets: 'auto' },
});
