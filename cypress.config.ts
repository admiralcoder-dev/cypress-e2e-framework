import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4179',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    testIsolation: true,
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 8000,
  requestTimeout: 8000,
  responseTimeout: 8000,
  video: true,
  screenshotOnRunFailure: true,
  retries: { runMode: 1, openMode: 0 },
});
