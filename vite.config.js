import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, forward /api requests to the small mail server (server/index.js).
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
});
