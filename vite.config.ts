import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/',                             // سایت در ریشهٔ ساب‌دامین
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '.')       // ریشهٔ فعلی (بدون src)
      }
    }
  };
});
