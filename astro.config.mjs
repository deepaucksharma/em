import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://deepaucksharma.github.io',
  base: '/em',
  integrations: [
    react(),
    sitemap(),
  ],
});
