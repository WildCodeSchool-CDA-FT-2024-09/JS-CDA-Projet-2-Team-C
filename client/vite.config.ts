import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', //  Listen on all network interfaces
    port: 5173, // Port exposed in Docker
    watch: {
      usePolling: true
    }
  },
  test: {
    globals: true, //means global variables will be available during tests like 'describe, it, expect' so we don't have to import it in every test file
    environment: 'jsdom', //simulating a browser environment
    setupFiles: ['./setupTest.ts'] //execute necessary code before running the tests. This is a perfect segue to create _setupTests.ts_.
  }
});
