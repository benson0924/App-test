import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          katex: ['katex'],
          three: ['three'],
          'quantum-core': ['quantum-core'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
