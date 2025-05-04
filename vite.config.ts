import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← required so Render can access the dev server
    port: Number(process.env.PORT) || 3000, // ← respect the port Render assigns
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
