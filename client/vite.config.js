import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //we need to set up the server in the vite.config.js for signup
  server: {
    proxy: {
      '/api':{
        target:'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
