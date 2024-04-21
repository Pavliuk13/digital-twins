import { defineConfig } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@@pages': `${path.resolve(__dirname, './src/pages')}`,
      '@@components': `${path.resolve(__dirname, './src/components')}`,
      '@@styles': `${path.resolve(__dirname, './src/styles')}`,
      '@@assets': `${path.resolve(__dirname, './src/assets')}`,
      '@@constants': `${path.resolve(__dirname, './src/constants')}`,
      '@@store': `${path.resolve(__dirname, './src/store')}`,
      '@@types': `${path.resolve(__dirname, './src/types')}`,
      '@@utils': `${path.resolve(__dirname, './src/utils')}`,
    },
  },
});
