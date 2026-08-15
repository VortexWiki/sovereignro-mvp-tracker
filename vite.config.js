import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the repo name when deployed to GitHub Pages under
// https://<user>.github.io/<repo>/ (Pages serves it from a subpath, not
// the domain root). Kept as "/" for local dev via an env check would add
// complexity for no real benefit here since `npm run dev` doesn't care
// about base at all, only the production build does.
export default defineConfig({
  base: '/sovereignro-mvp-tracker/',
  plugins: [
    react(),
  ],
})
