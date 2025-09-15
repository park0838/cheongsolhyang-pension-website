import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // GitHub Pages 배포를 위한 base path 설정
  base: process.env.NODE_ENV === 'production' ? '/cheongsolhyang-pension-website/' : '/',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Cheongsolhyang Pension',
        short_name: 'Cheongsolhyang',
        description: 'Find True Rest in Nature\'s Embrace',
        theme_color: '#2d5a27',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'swiper', 'react-select'],
          maps: ['leaflet', 'react-leaflet'],
          utils: ['date-fns', 'clsx', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
})