import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3030',
        changeOrigin: true,
        secure:false  
      }
    }
  },
  build: {
    outDir: 'dist' // This is the default, but you can explicitly set it
  },
  plugins: [react()],
})
