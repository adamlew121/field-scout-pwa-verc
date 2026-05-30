import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // Precache wszystkich zasobów App Shell (JS, CSS, HTML, ikony)
      includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Field Scout PWA',
        short_name: 'FieldScout',
        description: 'Terenowy rejestrator obserwacji z GPS',
        theme_color: '#35495e',
        background_color: '#35495e',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'pl',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'   // format maskable – wymaganie z instrukcji
          }
        ]
      },
      workbox: {
        // Strategia CacheFirst dla App Shell – ładuje się natychmiast nawet bez sieci
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      }
    })
  ]
})
