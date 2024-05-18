import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@nextui-org/react']
  },
  server: {
    port: 5173,
    host: '0.0.0.0' // Ensure Vite binds to all network interfaces
  }
})
