import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain => base '/'. For https://<user>.github.io/<repo>/ without a custom domain, set base to '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
