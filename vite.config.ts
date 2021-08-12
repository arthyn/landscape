import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/apps/grid/',
  server: {
    proxy: {
      '^((?!\/apps\/grid).)*$': {
        target: 'http://localhost:8080'
      }
    }
  },
  plugins: [reactRefresh()]
})
