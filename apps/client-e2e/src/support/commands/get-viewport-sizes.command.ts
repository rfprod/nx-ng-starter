import { viewportSizes } from '../config/viewport.config';

/**
 * Gets viewport sizes.
 */
export const getViewportSizes = () => {
  return cy.wrap<typeof viewportSizes>(viewportSizes);
};
