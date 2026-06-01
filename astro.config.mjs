// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gate.gzhu.co.nz',
  integrations: [sitemap()],
  output: 'static',
});
