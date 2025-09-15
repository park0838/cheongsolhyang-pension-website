import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react({
      // Optimize React compilation
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          // Remove console.log in production
          process.env.NODE_ENV === 'production' && 'babel-plugin-transform-remove-console'
        ].filter(Boolean)
      }
    }),

    // Optimized legacy support
    legacy({
      targets: ['Chrome >= 60', 'Firefox >= 60', 'Safari >= 12', 'Edge >= 79'],
      modernPolyfills: ['es.promise.finally', 'es.array.flat']
    }),

    // Enhanced PWA configuration
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      workbox: {
        // Optimize caching strategy
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB limit
        runtimeCaching: [
          // Cache Unsplash images
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                // Strip query parameters for better caching
                const url = new URL(request.url)
                return `${url.origin}${url.pathname}`
              }
            },
          },
          // Cache map tiles
          {
            urlPattern: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              }
            },
          },
          // Cache Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Cheongsolhyang Pension',
        short_name: 'Cheongsolhyang',
        description: 'Find True Rest in Nature\'s Embrace',
        theme_color: '#2d5a27',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
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

  // Enhanced build configuration
  build: {
    target: 'es2018', // Better browser support vs performance balance
    minify: 'terser',
    sourcemap: false, // Disable in production for security

    // Optimized asset handling
    assetsInlineLimit: 4096, // 4KB inline limit
    cssCodeSplit: true,

    // Terser optimization
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
      },
      mangle: {
        safari10: true,
      },
    },

    rollupOptions: {
      output: {
        // Optimized manual chunks with size targets
        manualChunks: {
          // Core React (target: <50KB gzipped)
          vendor: ['react', 'react-dom'],

          // Router and utilities (target: <30KB gzipped)
          router: ['react-router-dom'],
          utils: ['date-fns', 'clsx', 'lucide-react'],

          // UI libraries - split for better caching
          motion: ['framer-motion'],
          carousel: ['swiper'],
          forms: ['react-hook-form', 'react-select'],

          // Maps - separate due to size (target: <45KB gzipped)
          maps: ['leaflet', 'react-leaflet'],

          // Intersection observer separately for better tree-shaking
          observers: ['react-intersection-observer'],
        },

        // Optimize asset naming for long-term caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]

          // Separate CSS by type for better caching
          if (ext === 'css') {
            if (assetInfo.name.includes('vendor')) {
              return `assets/vendor.[hash].${ext}`
            }
            return `assets/styles.[hash].${ext}`
          }

          // Image optimization
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name].[hash].${ext}`
          }

          // Font optimization
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name].[hash].${ext}`
          }

          return `assets/[name].[hash].${ext}`
        },

        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'vendor') {
            return 'assets/vendor.[hash].js'
          }
          if (chunkInfo.name === 'maps') {
            return 'assets/maps.[hash].js'
          }
          return 'assets/[name].[hash].js'
        },
      },

      // Tree-shaking optimization
      external: [],

      // Reduce bundle size
      treeshake: {
        preset: 'recommended',
        manualPureFunctions: ['Object.freeze', 'Object.defineProperty'],
      }
    },

    chunkSizeWarningLimit: 600, // Warn for chunks > 600KB
  },

  // Enhanced dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hook-form',
      'date-fns',
      'clsx'
    ],
    exclude: [
      // Exclude large libraries that should be code-split
      'leaflet',
      'framer-motion'
    ],
    esbuildOptions: {
      target: 'es2018'
    }
  },

  // Development server optimizations
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    },
    // Enable compression in development
    middlewareMode: false,
  },

  preview: {
    port: 4173,
    headers: {
      // Security headers for production preview
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Cache control for assets
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },

  // CSS optimization
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // Add CSS optimization plugins for production
        process.env.NODE_ENV === 'production' && require('cssnano')({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: false
          }]
        })
      ].filter(Boolean)
    }
  },

  // Define environment variables for optimization
  define: {
    // Enable/disable features based on environment
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production',

    // Bundle analyzer flag
    __ANALYZE_BUNDLE__: process.env.ANALYZE_BUNDLE === 'true',

    // Feature flags for performance
    __ENABLE_PERFORMANCE_MONITORING__: true,
    __ENABLE_WEB_VITALS__: true,
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@data': '/src/data',
      '@styles': '/src/styles'
    }
  },

  // Experimental features for better performance
  experimental: {
    buildAdvancedBaseOptions: true,
    renderBuiltUrl(filename, { hostType, type }) {
      // Optimize asset URLs for CDN
      if (hostType === 'js' && type === 'asset') {
        return { runtime: `window.__assetBase + ${JSON.stringify(filename)}` }
      }
    }
  },

  // ESBuild optimizations
  esbuild: {
    target: 'es2018',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none'
  }
})