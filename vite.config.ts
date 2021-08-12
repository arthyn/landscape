import { defineConfig } from 'vite'
import analyze from 'rollup-plugin-analyzer'
import { visualizer } from 'rollup-plugin-visualizer'
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
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          limit: 20
        }),
        visualizer()
      ]
    }
  },
  plugins: [reactRefresh()]
})
