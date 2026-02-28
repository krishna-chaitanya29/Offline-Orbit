import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  const proxyTarget =
    (env.VITE_API_URL && env.VITE_API_URL.replace(/\/+$/, '')) ||
    'http://localhost:5000';

  return {
    plugins: [react()],
    define: {
      'process.env': env, // make env vars available
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
