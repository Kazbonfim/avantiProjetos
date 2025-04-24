import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: './', // Esse já está certo
  plugins: [react()],
  server: {
    port: 8080,
  }
})
