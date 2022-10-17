/// <reference types="cypress" />

/**
 * This example support/index.js is processed and
 * loaded automatically before your test files.
 *
 * This is a great place to put global configuration and
 * behavior that modifies Cypress.
 *
 * You can change the location of this file or turn off
 * automatically serving support files with the
 * 'supportFile' configuration option.
 *
 * You can read more here:
 * https://on.cypress.io/configuration
 */

import './commands';

/**
 * Catches uncaught exceptions.
 * Documentation reference: https://docs.cypress.io/api/events/catalog-of-events.html#Examples
 */
Cypress.on('uncaught:exception', (err, runnable) => {
  console.warn('Cypress:uncaught:exception', err);
  /**
   * Returning false here prevents Cypress from failing the test if Cypress encounters application error.
   */
  return false;
});
