import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      cache: false
    }),
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
      extendRoute(route) {
        if (route.path === '/login') {
          return {
            ...route,
            meta: { ...route.meta, auth: false }
          }
        }
        return route
      }
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    })
  ],
  server:{
    port: 8888,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
