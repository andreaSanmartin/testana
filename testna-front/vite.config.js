import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    open: true,
  },
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js'
    }
  },
  build: {
    cache: true,
    incremental: true,
    cacheDir: '.vite',
    assetsInlineLimit: 4096,
  }
});