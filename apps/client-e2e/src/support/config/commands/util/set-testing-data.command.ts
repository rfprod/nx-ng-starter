import { BehaviorSubject } from 'rxjs';

import { ITestingData, TTestingDataPayload } from '../../../interfaces/testing-data.interface';

/**
 * Sets testing data.
 * @note utility function, do not remove.
 */
export const setTestingData = (testingDataSubject: BehaviorSubject<ITestingData>, payload: TTestingDataPayload) => {
  const currentValue = { ...testingDataSubject.value };

  for (const k of Object.keys(payload)) {
    const key = k as keyof TTestingDataPayload;
    const value = payload[key];
    currentValue[key] = value;
  }
  testingDataSubject.next(currentValue);

  return cy.wrap<typeof testingDataSubject.value>(currentValue);
};
