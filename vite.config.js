import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // define env variables
    define: {
      'process.env': env
    },
    server: {
      // enable https
      https: true
    },
    // enable mkcert and react
    plugins: [mkcert(), react()]
  }
})