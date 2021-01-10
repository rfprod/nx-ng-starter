import { BehaviorSubject } from 'rxjs';

import { ITestingData } from '../../../interfaces/testing-data.interface';

/**
 * Sets viewport size.
 * @note utility function, do not remove.
 */
export const setViewportSize = (options: {
  testingData: BehaviorSubject<ITestingData>;
  height?: number;
  widht?: number;
}) => {
  const height = options?.height ?? options.testingData.value.viewport.defaultHeight;
  const width = options?.widht ?? options.testingData.value.viewport.defaultWidth;

  return cy.viewport(height, width);
};
