import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  context: path.resolve(__dirname, './src'),
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [vue()],
  resolve: {
    alias: {
     '@': path.resolve(__dirname, './src'),
     '@images': path.resolve(__dirname, 'src/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
})
