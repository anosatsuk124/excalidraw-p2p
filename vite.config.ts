import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    devlog: 'window.devlog',
    'process.env': {},
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@excalidraw/excalidraw',
      'styled-components',
    ],
  },
  plugins: [react(), tsconfigPaths()],
});
