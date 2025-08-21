import { defineConfig } from 'vite';
import { resolve } from 'path';
import { globSync } from 'glob';

export default defineConfig({
  base: '/ai-fast-presentation/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          globSync('workshops/**/*.html').map(file => [
            file.slice('workshops/'.length, -'.html'.length),
            resolve(__dirname, file)
          ])
        )
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
  },
});