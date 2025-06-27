import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://power-tools-reviews.vercel.app',
  integrations: [react()],
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  }
}); 