import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],

      manifest: {
        id: '/',
        name: 'Stock Request Assistant',
        short_name: 'StockReq',
        description: 'Fast, offline-first stock request tool for shop floor teams.',

        start_url: '/',
        scope: '/',

        display: 'standalone',
        orientation: 'portrait',

        background_color: '#ffffff',
        theme_color: '#000000',

        lang: 'en',

        categories: [
          'business',
          'productivity'
        ],

        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webmanifest}'
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },

      devOptions: {
        enabled: false
      }
    })
  ]
})