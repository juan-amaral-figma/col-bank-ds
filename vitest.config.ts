import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.tsx', 'tests/**/*.test.tsx', 'tests/**/*.test.mjs'],
    globals: true,
  },
});
