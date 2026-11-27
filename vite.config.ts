import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub project sites are hosted below the repository name. This makes Vite
// emit `/myWebsite/assets/...` URLs instead of `/assets/...` URLs.
export default defineConfig({
  base: '/myWebsite/',
  plugins: [react(), tailwindcss()],
})
