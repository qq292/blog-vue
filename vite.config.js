import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const host = 'http://47.120.32.20:8000'
const local = 'http://127.0.0.1:8000'
// https://vitejs.dev/config/
export default defineConfig({
  // lintOnSave: false,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
    // proxy: {
    //   '/api/': {
    //     target: local,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },

  base: '/',

})


