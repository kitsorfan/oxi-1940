import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /<repo>/.
export default defineConfig({
  base: '/oxi-1940/',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
