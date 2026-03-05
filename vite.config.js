import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  publicDir: '../public',
  envDir: '..' // Look for .env in parent directory (project root)
});
