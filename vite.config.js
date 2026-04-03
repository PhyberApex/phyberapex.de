import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vueDevTools(), vue({
    template: {
      transformAssetUrls: false,
    },
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@data': __dirname,
    },
  },
})
