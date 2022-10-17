import { viewportSizes } from '../config/viewport.config';

/**
 * Sets viewport size based on preconfigured options.
 * @param config viewport options configuration name
 */
export const setViewportSize = (config: keyof typeof viewportSizes) => {
  const size = viewportSizes[config];
  return cy.viewport(size.height, size.width);
};
