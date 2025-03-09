import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: true, // Esto permite que Vite detecte `postcss.config.js` automáticamente
  },
});
