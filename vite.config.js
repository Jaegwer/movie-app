import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import legacy from '@vitejs/plugin-legacy'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    // Define your environment variables here
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
      VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY)
    }
  }
})
