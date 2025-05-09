const { defineConfig } = require('cypress');

module.exports = defineConfig({
  experimentalStudio: true,
  chromeWebSecurity: false,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  reporter: '../../node_modules/cypress-multi-reporters/index.js',
  reporterOptions: {
    configFile: 'cypress-reporter-options.json',
  },
  screenshotsFolder: '../../dist/cypress/apps/client-diagnostics-e2e/screenshots',
  video: true,
  videosFolder: '../../dist/cypress/apps/client-diagnostics-e2e/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./src/plugins/index.ts').default(on, config);
    },
    baseUrl: 'http://localhost:4400',
    specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './src/support/index.ts',
    // Please ensure you use `cy.origin()` when navigating between domains and remove this option.
    // See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
    injectDocumentDomain: true,
  },
});
