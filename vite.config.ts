import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    open: true,
    proxy: {
      '/baiduapi': {
        target: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduapi/, '')
      }
    }
  }
})
