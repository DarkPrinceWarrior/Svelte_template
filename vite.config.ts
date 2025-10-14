import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/i18n' }),tailwindcss(), sveltekit()]
});
