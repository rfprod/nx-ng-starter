import { BehaviorSubject } from 'rxjs';

import { ITestingData } from '../../../interfaces/testing-data.interface';

/**
 * Sets viewport size.
 * @note utility function, do not remove.
 */
export const setViewportSize = (options: {
  testingDataSubject: BehaviorSubject<ITestingData>;
  height?: number;
  widht?: number;
}) => {
  const height = options?.height ?? options.testingDataSubject.value.viewport.defaultHeight;
  const width = options?.widht ?? options.testingDataSubject.value.viewport.defaultWidth;

  return cy.viewport(height, width);
};
