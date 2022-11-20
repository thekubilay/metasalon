import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
const {resolve} = require('path');
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // server: {
  //   https: {
  //      key: fs.readFileSync('/Users/kubilayturgut/ssl/kubilayhome-key.pem'),
  //      cert: fs.readFileSync('/Users/kubilayturgut/ssl/kubilayhome.pem'),
  //    }
  // },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  },
})
