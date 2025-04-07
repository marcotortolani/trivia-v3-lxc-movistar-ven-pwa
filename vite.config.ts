import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
//import filterReplace from 'vite-plugin-filter-replace'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,jsx,css,html}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.json'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'json-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.mp3'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'mp3-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
        ],
        // clientsClaim: true,
        // skipWaiting: true
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.webp',
      ],
      manifest: {
        name: 'Trivia Locos x la Cocina',
        short_name: 'Trivia Locos x la Cocina',
        description: 'Juego de preguntas por categorías - by Media Moob',
        theme_color: '#000',
        icons: [
          {
            src: '/public/logo-96x96.webp',
            sizes: '96x96',
            type: 'image/webp',
          },
          {
            src: '/public/logo-128x128.webp',
            sizes: '128x128',
            type: 'image/webp',
          },
          {
            src: '/public/logo-256x256.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
          {
            src: '/public/logo-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
        ],
      },
    }),
    // Workaround warning with lottie - https://github.com/airbnb/lottie-web/issues/2927
    // filterReplace([
    //   {
    //     filter: ['node_modules/lottie-web/build/player/lottie.js'],
    //     replace: {
    //       from: "eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0]",
    //       to: "(new Function('scoped_bm_rt', val + ';return $bm_rt;'))()",
    //     },
    //   },
    // ]),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  base: '/',
})
