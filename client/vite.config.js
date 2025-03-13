import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hotel-website-1-r5kh.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
