import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [react(), compression()],
   base: '/final-project-fullstack/',    // Tidak perlu di-set, biarkan default
})