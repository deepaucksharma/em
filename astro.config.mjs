import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://engineering-leadership-matrix.dev',
  integrations: [
    react(),
    sitemap(),
  ],
});
