import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5174,
    allowedHosts: ['3d-calc.croyer.fr'],
    hmr: {
      clientPort: 443,
      host: '3d-calc.croyer.fr',
      protocol: 'wss',
    },
    watch: {
      ignored: ['**/.superpowers/**', '**/.git/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
