import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/Final_Project/', // GANTI sesuai nama repo kamu
  plugins: [react(), compression()],
})
